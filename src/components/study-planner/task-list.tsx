export type PlannerTask = {
  title: string;
  subject: string;
  due: string;
  progress: number;
  priority: "High" | "Medium" | "Low";
};

const priorityTone = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-orange-50 text-orange-700",
  Low: "bg-emerald-50 text-emerald-700",
} as const;

export function TaskList({
  items,
  emptySubject,
}: {
  items: PlannerTask[];
  emptySubject: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-[12px] border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-500">
        No upcoming tasks for {emptySubject}.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((task) => (
        <article
          key={`${task.title}-${task.due}`}
          className="rounded-[12px] border border-neutral-200 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-950">
                {task.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-neutral-600">
                {task.subject}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{task.due}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${priorityTone[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-semibold text-neutral-500">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
