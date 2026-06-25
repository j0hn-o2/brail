"use client";

import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  FlaskConical,
  Grid2X2,
  Moon,
  PenLine,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";

import { HeaderNav, type NavItem } from "@/components/dashboard/header-nav";
import { Panel } from "@/components/dashboard/panel";

import {
  AiRecommendationPanel,
  type Recommendation,
} from "./ai-recommendation-panel";
import { ScheduleList, type ScheduleItem } from "./schedule-list";
import { SubjectFilter } from "./subject-filter";
import { TaskList, type PlannerTask } from "./task-list";
import { WeeklyCalendar, type CalendarDay } from "./weekly-calendar";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const timetableSlots = [
  "12am",
  "2am",
  "4am",
  "6am",
  "8am",
  "10am",
  "12pm",
  "2pm",
  "4pm",
  "6pm",
  "8pm",
  "10pm",
] as const;

function AvailabilityGrid({
  unavailable,
  onToggle,
}: {
  unavailable: boolean[][];
  onToggle: (dayIndex: number, slotIndex: number) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">
        Click any block to mark when you are unavailable for study sessions.
      </p>

      <div className="overflow-x-auto rounded-[16px] border border-neutral-200 bg-neutral-50 p-3">
        <div className="grid min-w-[840px] grid-cols-[90px_repeat(7,minmax(0,1fr))] gap-px bg-neutral-200">
          <div className="bg-white px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Time
          </div>
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-white px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
            >
              {day}
            </div>
          ))}

          {timetableSlots.map((slot, slotIndex) => (
            <Fragment key={slot}>
              <div className="bg-white px-3 py-3 text-sm font-medium text-neutral-700">
                {slot}
              </div>
              {weekDays.map((day, dayIndex) => {
                const isUnavailable = unavailable[dayIndex]?.[slotIndex];
                return (
                  <button
                    key={`${day}-${slot}`}
                    type="button"
                    aria-pressed={isUnavailable}
                    onClick={() => onToggle(dayIndex, slotIndex)}
                    className={
                      "min-h-[56px] px-2 py-3 text-left text-sm transition " +
                      (isUnavailable
                        ? "bg-blue-600 text-white"
                        : "bg-white text-neutral-700 hover:bg-slate-100")
                    }
                  >
                    <span className="block text-xs font-semibold">
                      {isUnavailable ? "Busy" : "Free"}
                    </span>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="text-sm text-neutral-500">
        The planner can use this unavailable grid to avoid scheduling study sessions during classes or other busy times.
      </div>
    </div>
  );
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Grid2X2, href: "/" },
  {
    label: "Study Planner",
    icon: CalendarDays,
    href: "/study-planner",
    active: true,
  },
  { label: "Performance", icon: TrendingUp, href: "#" },
  { label: "Goals", icon: Target, href: "#" },
  { label: "Peer Support", icon: UsersRound, href: "#" },
];

const subjects = [
  "All",
  "Calculus II",
  "Physics",
  "Software Engineering",
  "Academic Writing",
];

const week: CalendarDay[] = [
  {
    day: "Mon",
    date: "17",
    load: 3,
    focus: "Calculus II",
    active: true,
    tone: "blue",
  },
  {
    day: "Tue",
    date: "18",
    load: 2,
    focus: "Physics",
    tone: "orange",
  },
  {
    day: "Wed",
    date: "19",
    load: 4,
    focus: "Software Engineering",
    tone: "purple",
  },
  {
    day: "Thu",
    date: "20",
    load: 2,
    focus: "Academic Writing",
    tone: "green",
  },
  {
    day: "Fri",
    date: "21",
    load: 3,
    focus: "Calculus II",
    tone: "blue",
  },
  {
    day: "Sat",
    date: "22",
    load: 1,
    focus: "Physics",
    tone: "orange",
  },
  {
    day: "Sun",
    date: "23",
    load: 1,
    focus: "Review",
    tone: "gray",
  },
];

const schedule: ScheduleItem[] = [
  {
    time: "8:30 AM",
    duration: "60 min",
    title: "Revise integration techniques",
    subject: "Calculus II",
    location: "Library floor 2",
    icon: BookOpen,
    tone: "blue",
    status: "Priority",
  },
  {
    time: "10:15 AM",
    duration: "45 min",
    title: "Physics lab report draft",
    subject: "Physics",
    location: "Engineering block",
    icon: FlaskConical,
    tone: "orange",
  },
  {
    time: "1:00 PM",
    duration: "90 min",
    title: "Sprint board cleanup",
    subject: "Software Engineering",
    location: "Online workspace",
    icon: Code2,
    tone: "purple",
  },
  {
    time: "4:30 PM",
    duration: "45 min",
    title: "Thesis paragraph polish",
    subject: "Academic Writing",
    location: "Hostel desk",
    icon: PenLine,
    tone: "green",
  },
];

const tasks: PlannerTask[] = [
  {
    title: "Submit Problem Set 5",
    subject: "Calculus II",
    due: "Today, 11:59 PM",
    progress: 72,
    priority: "High",
  },
  {
    title: "Complete lab calculations",
    subject: "Physics",
    due: "Tomorrow, 5:00 PM",
    progress: 48,
    priority: "Medium",
  },
  {
    title: "Refine project milestone notes",
    subject: "Software Engineering",
    due: "Friday, 9:00 AM",
    progress: 35,
    priority: "High",
  },
  {
    title: "Outline literature review",
    subject: "Academic Writing",
    due: "Saturday, 2:00 PM",
    progress: 58,
    priority: "Low",
  },
];

const recommendations: Recommendation[] = [
  {
    title: "Start with Calculus II",
    detail:
      "Your highest-impact deadline is tonight. Block the first deep-work slot for problem-solving before switching subjects.",
  },
  {
    title: "Use a short recovery gap",
    detail:
      "Add 15 minutes after the lab report draft so the next coding session starts with better focus.",
  },
  {
    title: "Keep writing lightweight",
    detail:
      "Academic Writing can stay as a closing review task because it needs polish more than heavy recall.",
  },
];

export function StudyPlannerPage() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [unavailable, setUnavailable] = useState<boolean[][]>(() =>
    Array.from({ length: weekDays.length }, () =>
      Array(timetableSlots.length).fill(false),
    ),
  );

  const filteredSchedule = useMemo(
    () =>
      selectedSubject === "All"
        ? schedule
        : schedule.filter((item) => item.subject === selectedSubject),
    [selectedSubject],
  );

  const filteredTasks = useMemo(
    () =>
      selectedSubject === "All"
        ? tasks
        : tasks.filter((task) => task.subject === selectedSubject),
    [selectedSubject],
  );

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <HeaderNav items={navItems} actionIcon={Moon} />

      <main className="mx-auto w-full max-w-[1268px] px-5 pb-16 pt-10 sm:px-8 lg:px-10">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-blue-600">
              <CalendarDays className="h-4 w-4" />
              Study Planner
            </p>
            <h1 className="text-3xl font-semibold text-neutral-950 sm:text-4xl">
              Plan a focused academic week
            </h1>
            <p className="mt-3 text-lg leading-8 text-neutral-500">
              Balance lectures, assignments, deadlines, and recovery time with
              an AI-assisted weekly plan.
            </p>
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#050416] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-neutral-800 sm:w-auto"
          >
            <Sparkles className="h-5 w-5" />
            Generate Study Plan
          </button>
        </section>

        <section className="mt-8">
          <SubjectFilter
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSelect={setSelectedSubject}
          />
        </section>

        <section className="mt-8 grid gap-7 xl:grid-cols-[1.35fr_0.65fr]">
          <Panel title="Weekly Calendar" actionLabel="Add Session" actionHref="#">
            <WeeklyCalendar days={week} selectedSubject={selectedSubject} />
          </Panel>

          <AiRecommendationPanel
            recommendations={recommendations}
            selectedSubject={selectedSubject}
          />
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel title="Today&apos;s Schedule">
            <ScheduleList items={filteredSchedule} emptySubject={selectedSubject} />
          </Panel>

          <Panel title="Upcoming Tasks" actionLabel="New Task" actionHref="#">
            <TaskList items={filteredTasks} emptySubject={selectedSubject} />
          </Panel>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Available focus time", value: "5h 15m", icon: Clock3 },
            { label: "Planned sessions", value: "11", icon: CalendarDays },
            { label: "Tasks on track", value: "7/9", icon: CheckCircle2 },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[14px] border border-neutral-200 bg-neutral-50 p-5"
            >
              <item.icon className="h-5 w-5 text-blue-600" />
              <p className="mt-5 text-2xl font-semibold text-neutral-950">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-7">
          <Panel title="Weekly Unavailable Times">
            <AvailabilityGrid
              unavailable={unavailable}
              onToggle={(dayIndex, slotIndex) =>
                setUnavailable((prev) => {
                  const next = prev.map((row) => row.slice());
                  next[dayIndex][slotIndex] = !next[dayIndex][slotIndex];
                  return next;
                })
              }
            />
          </Panel>
        </section>
      </main>

      <button
        type="button"
        aria-label="Add planner item"
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#2f7ef6] to-[#a434f5] text-white shadow-[0_12px_22px_rgba(74,67,224,0.35)] transition hover:scale-[1.02]"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
