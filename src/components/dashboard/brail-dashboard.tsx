import {
  BarChart3,
  BookOpen,
  Calendar,
  CalendarDays,
  Flame,
  Grid2X2,
  HelpCircle,
  Medal,
  MessageCircle,
  Moon,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { DeadlineList, type DeadlineItem } from "./deadline-list";
import { FloatingActions } from "./floating-actions";
import { HeaderNav, type NavItem } from "./header-nav";
import { MetricCard, type MetricCardProps } from "./metric-card";
import { Panel } from "./panel";
import { StudyPlanList, type StudyPlanItem } from "./study-plan-list";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Grid2X2, href: "/", active: true },
  { label: "Study Planner", icon: CalendarDays, href: "/study-planner" },
  { label: "Performance", icon: TrendingUp, href: "#" },
  { label: "Goals", icon: Target, href: "#" },
  { label: "Peer Support", icon: UsersRound, href: "#" },
];

const metrics: MetricCardProps[] = [
  {
    label: "Current GPA",
    value: "3.7",
    detail: "+0.2",
    icon: BarChart3,
    tone: "blue",
  },
  {
    label: "Study Hours",
    value: "24h",
    detail: "+8h",
    icon: BookOpen,
    tone: "purple",
    elevated: true,
  },
  {
    label: "Tasks Due",
    value: "5",
    detail: "2 today",
    icon: Calendar,
    tone: "orange",
  },
  {
    label: "Study Streak",
    value: "12d",
    detail: "Keep it up!",
    icon: Medal,
    tone: "green",
  },
];

const studyPlan: StudyPlanItem[] = [
  {
    time: "2:00 PM - 3:30 PM",
    course: "Calculus II",
    task: "Integration Practice",
    priority: true,
    tone: "blue",
  },
  {
    time: "4:00 PM - 5:00 PM",
    course: "Physics",
    task: "Lab Report Writing",
    tone: "gray",
  },
  {
    time: "7:30 PM - 8:30 PM",
    course: "Academic Writing",
    task: "Research outline review",
    tone: "green",
  },
];

const deadlines: DeadlineItem[] = [
  {
    title: "Problem Set 5",
    course: "Calculus II",
    due: "Today, 11:59 PM",
    tone: "red",
  },
  {
    title: "Lab Report 3",
    course: "Physics",
    due: "Tomorrow, 5:00 PM",
    tone: "orange",
  },
  {
    title: "Project Milestone 2",
    course: "Software Engineering",
    due: "Friday, 9:00 AM",
    tone: "red",
  },
];

export function BrailDashboard() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <HeaderNav items={navItems} actionIcon={Moon} />

      <main className="mx-auto w-full max-w-[1268px] px-5 pb-16 pt-12 sm:px-8 lg:px-10">
        <section className="space-y-3">
          <h1 className="text-[26px] font-semibold tracking-normal text-neutral-950">
            Welcome back, Alex!
          </h1>
          <p className="text-lg text-neutral-500">
            Here&apos;s your academic overview for today
          </p>
        </section>

        <section
          aria-label="Academic metrics"
          className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="mt-10 grid gap-7 lg:grid-cols-2">
          <Panel
            title="AI Study Plan for Today"
            actionLabel="View Full Plan"
            actionHref="#study-plan"
          >
            <StudyPlanList items={studyPlan} />
          </Panel>

          <Panel
            title="Upcoming Deadlines"
            actionLabel="View All"
            actionHref="#deadlines"
          >
            <DeadlineList items={deadlines} />
          </Panel>
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel title="Weekly Focus" actionLabel="Details" actionHref="#focus">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Lecture prep", value: "82%", icon: BookOpen },
                { label: "Goal pace", value: "4/5", icon: Target },
                { label: "Active streak", value: "12d", icon: Flame },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
                >
                  <item.icon className="mb-5 h-5 w-5 text-blue-600" />
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-neutral-500">{item.label}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Peer Support" actionLabel="Open" actionHref="#support">
            <div className="rounded-lg border border-neutral-200 bg-[#f6f7fb] p-5">
              <p className="text-base font-semibold text-neutral-950">
                3 study groups are active
              </p>
              <p className="mt-2 leading-7 text-neutral-500">
                Calculus II peers are reviewing integration practice before the
                evening session.
              </p>
            </div>
          </Panel>
        </section>
      </main>

      <FloatingActions
        primaryIcon={MessageCircle}
        secondaryIcon={HelpCircle}
        alertCount={1}
      />
    </div>
  );
}
