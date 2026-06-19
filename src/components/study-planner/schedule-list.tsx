import type { LucideIcon } from "lucide-react";

export type ScheduleItem = {
  time: string;
  duration: string;
  title: string;
  subject: string;
  location: string;
  icon: LucideIcon;
  tone: "blue" | "orange" | "purple" | "green";
  status?: string;
};

const scheduleTone = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
} as const;

export function ScheduleList({
  items,
  emptySubject,
}: {
  items: ScheduleItem[];
  emptySubject: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-[12px] border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-500">
        No sessions scheduled for {emptySubject} today.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={`${item.time}-${item.title}`}
          className="grid gap-4 rounded-[12px] border border-neutral-200 bg-white p-4 sm:grid-cols-[92px_1fr]"
        >
          <div>
            <p className="text-lg font-semibold text-neutral-950">{item.time}</p>
            <p className="mt-1 text-sm text-neutral-500">{item.duration}</p>
          </div>

          <div className="flex gap-4">
            <div
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border ${scheduleTone[item.tone]}`}
            >
              <item.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-950">
                  {item.title}
                </h3>
                {item.status ? (
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                    {item.status}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-neutral-600">
                {item.subject}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{item.location}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
