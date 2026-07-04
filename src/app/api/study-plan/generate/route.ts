import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Sign in before generating a study plan." }, { status: 401 });
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

  return NextResponse.json({
    sessions: planned.sort(
      (a, b) =>
        weekDays.indexOf(a.dayOfWeek as (typeof weekDays)[number]) -
          weekDays.indexOf(b.dayOfWeek as (typeof weekDays)[number]) ||
        toMinutes(a.startTime) - toMinutes(b.startTime),
    ),
    summary: {
      classCount: rows.length,
      courseCount: courses.length,
      plannedHours: Math.round((planned.reduce((sum, session) => sum + session.durationMinutes, 0) / 60) * 10) / 10,
    },
  });
}
