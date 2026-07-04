import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

type TimetableRow = {
  id: string;
  courseCode: string;
  courseName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  venue?: string;
  confidence?: number;
};

type PlannerPreferences = {
  sessionLength: number;
  preferredStart: string;
  preferredEnd: string;
  intensity: "light" | "balanced" | "intense";
};

type GenerateBody = {
  rows?: TimetableRow[];
  preferences?: Partial<PlannerPreferences>;
};

type BusyBlock = {
  start: number;
  end: number;
};

type GeneratedSession = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subject: string;
  task: string;
  durationMinutes: number;
  priority: "high" | "medium" | "low";
  reason: string;
};

type SessionUser = {
  id?: string;
  email?: string | null;
};

type SavedStudyPlan = {
  id: string;
  start_date: Date | string | null;
  end_date: Date | string | null;
  study_plan_items: Array<{
    id: string;
    task: string | null;
    scheduled_time: Date | string | null;
    duration_minutes: number | null;
    courses: {
      course_code: string;
      course_name: string;
    } | null;
  }>;
};

function toMinutes(value: string) {
  const [hours = "0", minutes = "0"] = value.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function toTime(minutes: number) {
  const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
}

function overlaps(start: number, end: number, block: BusyBlock) {
  return start < block.end && end > block.start;
}

function isValidRow(row: TimetableRow) {
  return (
    row.courseCode.trim().length > 0 &&
    row.courseName.trim().length > 0 &&
    weekDays.includes(row.dayOfWeek as (typeof weekDays)[number]) &&
    toMinutes(row.startTime) < toMinutes(row.endTime)
  );
}

function sessionsPerCourse(intensity: PlannerPreferences["intensity"]) {
  if (intensity === "light") return 1;
  if (intensity === "intense") return 3;
  return 2;
}

async function getCurrentUserId(sessionUser: SessionUser) {
  if (sessionUser.id) return sessionUser.id;

  const email = sessionUser.email?.trim().toLowerCase();
  if (!email) return "";

  const user = await prisma.users.findUnique({ where: { email } });
  return user?.id ?? "";
}

function getWeekBounds() {
  const now = new Date();
  const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = startDate.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;
  startDate.setUTCDate(startDate.getUTCDate() - daysSinceMonday);

  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getUTCDate() + 6);

  return { startDate, endDate };
}

function scheduledDateForSession(weekStart: Date, session: GeneratedSession) {
  const dayIndex = weekDays.indexOf(session.dayOfWeek as (typeof weekDays)[number]);
  const [hours = "0", minutes = "0"] = session.startTime.split(":");
  const date = new Date(weekStart);
  date.setUTCDate(weekStart.getUTCDate() + Math.max(dayIndex, 0));
  date.setUTCHours(Number(hours), Number(minutes), 0, 0);
  return date;
}

function dayFromDate(value: Date) {
  return weekDays[(value.getUTCDay() + 6) % 7];
}

function formatStoredTime(value: Date) {
  return `${value.getUTCHours().toString().padStart(2, "0")}:${value.getUTCMinutes().toString().padStart(2, "0")}`;
}

function buildSavedSessions(plan: SavedStudyPlan): GeneratedSession[] {
  return plan.study_plan_items
    .filter((item) => item.scheduled_time)
    .map((item) => {
      const scheduledTime = new Date(item.scheduled_time as Date | string);
      const durationMinutes = item.duration_minutes ?? 60;
      const endTime = new Date(scheduledTime);
      endTime.setUTCMinutes(scheduledTime.getUTCMinutes() + durationMinutes);
      const [task = "Study session", reason = "Loaded from your saved study plan."] = (item.task ?? "").split("||");
      const subject = item.courses
        ? `${item.courses.course_code} - ${item.courses.course_name}`
        : "Study session";

      return {
        id: item.id,
        dayOfWeek: dayFromDate(scheduledTime),
        startTime: formatStoredTime(scheduledTime),
        endTime: formatStoredTime(endTime),
        subject,
        task: task.trim() || "Study session",
        durationMinutes,
        priority: "medium" as const,
        reason: reason.trim() || "Loaded from your saved study plan.",
      };
    })
    .sort(
      (a, b) =>
        weekDays.indexOf(a.dayOfWeek as (typeof weekDays)[number]) -
          weekDays.indexOf(b.dayOfWeek as (typeof weekDays)[number]) ||
        toMinutes(a.startTime) - toMinutes(b.startTime),
    );
}

async function savePlanForUser(userId: string, rows: TimetableRow[], sessions: GeneratedSession[]) {
  const { startDate, endDate } = getWeekBounds();
  const courseRecords = new Map<string, { id: string }>();
  const courses = Array.from(new Map(rows.map((row) => [row.courseCode, row])).values());

  for (const course of courses) {
    const record = (await prisma.courses.upsert({
      where: { course_code: course.courseCode },
      update: {
        course_name: course.courseName || course.courseCode,
      },
      create: {
        course_code: course.courseCode,
        course_name: course.courseName || course.courseCode,
      },
      select: { id: true },
    })) as { id: string };

    courseRecords.set(course.courseCode, record);
  }

  const existingPlan = (await prisma.study_plans.findFirst({
    where: {
      user_id: userId,
      title: "Generated Study Timetable",
      generated_by_ai: true,
    },
    select: { id: true },
  })) as { id: string } | null;

  if (existingPlan) {
    await prisma.study_plan_items.deleteMany({
      where: { study_plan_id: existingPlan.id },
    });

    await prisma.study_plans.update({
      where: { id: existingPlan.id },
      data: {
        start_date: startDate,
        end_date: endDate,
      },
    });
  }

  const plan = (existingPlan ??
    ((await prisma.study_plans.create({
      data: {
        user_id: userId,
        title: "Generated Study Timetable",
        generated_by_ai: true,
        start_date: startDate,
        end_date: endDate,
      },
      select: { id: true },
    })) as { id: string }));

  await prisma.study_plan_items.createMany({
    data: sessions.map((session) => {
      const courseCode = session.subject.split(" - ")[0]?.trim();
      const course = courseRecords.get(courseCode);

      return {
        study_plan_id: plan.id,
        course_id: course?.id,
        task: `${session.task} || ${session.reason}`,
        scheduled_time: scheduledDateForSession(startDate, session),
        duration_minutes: session.durationMinutes,
        status: "pending",
      };
    }),
  });

  return plan.id;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as SessionUser | undefined;

  if (!sessionUser) {
    return NextResponse.json({ message: "Sign in before loading a study plan." }, { status: 401 });
  }

  const userId = await getCurrentUserId(sessionUser);

  if (!userId) {
    return NextResponse.json({ message: "Could not find your account." }, { status: 404 });
  }

  const plan = (await prisma.study_plans.findFirst({
    where: {
      user_id: userId,
      title: "Generated Study Timetable",
      generated_by_ai: true,
    },
    orderBy: { created_at: "desc" },
    include: {
      study_plan_items: {
        orderBy: { scheduled_time: "asc" },
        include: {
          courses: {
            select: {
              course_code: true,
              course_name: true,
            },
          },
        },
      },
    },
  })) as SavedStudyPlan | null;

  if (!plan) {
    return NextResponse.json({ sessions: [], summary: null });
  }

  const sessions = buildSavedSessions(plan);
  const courseCodes = new Set(plan.study_plan_items.map((item) => item.courses?.course_code).filter(Boolean));

  return NextResponse.json({
    planId: plan.id,
    sessions,
    summary: {
      classCount: 0,
      courseCount: courseCodes.size,
      plannedHours: Math.round((sessions.reduce((sum, item) => sum + item.durationMinutes, 0) / 60) * 10) / 10,
    },
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as SessionUser | undefined;

  if (!sessionUser) {
    return NextResponse.json({ message: "Sign in before generating a study plan." }, { status: 401 });
  }

  const userId = await getCurrentUserId(sessionUser);

  if (!userId) {
    return NextResponse.json({ message: "Could not find your account." }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as GenerateBody | null;
  const rows = body?.rows?.filter(isValidRow) ?? [];

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Confirm at least one valid class row before generating a study plan." },
      { status: 400 },
    );
  }

  const preferences: PlannerPreferences = {
    sessionLength: Math.min(Math.max(Number(body?.preferences?.sessionLength) || 60, 30), 120),
    preferredStart: body?.preferences?.preferredStart || "08:00",
    preferredEnd: body?.preferences?.preferredEnd || "21:00",
    intensity: body?.preferences?.intensity || "balanced",
  };

  const dayBusyBlocks = new Map<string, BusyBlock[]>();

  for (const day of weekDays) {
    dayBusyBlocks.set(day, []);
  }

  for (const row of rows) {
    const blocks = dayBusyBlocks.get(row.dayOfWeek) ?? [];
    blocks.push({
      start: Math.max(toMinutes(row.startTime) - 15, 0),
      end: Math.min(toMinutes(row.endTime) + 30, 24 * 60),
    });
    dayBusyBlocks.set(row.dayOfWeek, blocks);
  }

  const courses = Array.from(new Map(rows.map((row) => [row.courseCode, row])).values());
  const planned: GeneratedSession[] = [];
  const sessionLength = preferences.sessionLength;
  const startWindow = toMinutes(preferences.preferredStart);
  const endWindow = toMinutes(preferences.preferredEnd);
  const targetCount = sessionsPerCourse(preferences.intensity);

  for (const course of courses) {
    for (let count = 0; count < targetCount; count += 1) {
      let placed = false;

      for (const day of weekDays) {
        if (placed) break;

        const busyBlocks = [
          ...(dayBusyBlocks.get(day) ?? []),
          ...planned
            .filter((session) => session.dayOfWeek === day)
            .map((session) => ({
              start: toMinutes(session.startTime),
              end: toMinutes(session.endTime),
            })),
        ];

        for (let start = startWindow; start + sessionLength <= endWindow; start += 30) {
          const end = start + sessionLength;
          const hasConflict = busyBlocks.some((block) => overlaps(start, end, block));

          if (!hasConflict) {
            planned.push({
              id: crypto.randomUUID(),
              dayOfWeek: day,
              startTime: toTime(start),
              endTime: toTime(end),
              subject: `${course.courseCode} - ${course.courseName}`,
              task: count === 0 ? "Review lecture notes" : count === 1 ? "Practice problem set" : "Recall and summary session",
              durationMinutes: sessionLength,
              priority: count === 0 ? "high" : count === 1 ? "medium" : "low",
              reason: `Scheduled in a free ${sessionLength}-minute block outside your confirmed class times.`,
            });
            placed = true;
            break;
          }
        }
      }
    }
  }

  const sessions = planned.sort(
    (a, b) =>
      weekDays.indexOf(a.dayOfWeek as (typeof weekDays)[number]) -
        weekDays.indexOf(b.dayOfWeek as (typeof weekDays)[number]) ||
      toMinutes(a.startTime) - toMinutes(b.startTime),
  );
  const planId = await savePlanForUser(userId, rows, sessions);

  return NextResponse.json({
    planId,
    sessions,
    summary: {
      classCount: rows.length,
      courseCount: courses.length,
      plannedHours: Math.round((planned.reduce((sum, session) => sum + session.durationMinutes, 0) / 60) * 10) / 10,
    },
  });
}
