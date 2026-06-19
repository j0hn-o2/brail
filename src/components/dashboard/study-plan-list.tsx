export type StudyPlanItem = {
  time: string;
  course: string;
  task: string;
  priority?: boolean;
  tone: "blue" | "gray" | "green";
};

const planTone = {
  blue: "border-blue-200 bg-[#eef6ff]",
  gray: "border-neutral-200 bg-[#f0f0f4]",
  green: "border-emerald-200 bg-[#effaf4]",
} as const;

export function StudyPlanList({ items }: { items: StudyPlanItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <article
          key={`${item.time}-${item.course}`}
          className={`rounded-[10px] border p-5 ${planTone[item.tone]}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base text-neutral-500">{item.time}</p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-950">
                {item.course}
              </h3>
              <p className="mt-2 text-base text-neutral-500">{item.task}</p>
            </div>

            {item.priority ? (
              <span className="rounded-full bg-[#1d69f2] px-3 py-1.5 text-sm font-medium text-white">
                Priority
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
