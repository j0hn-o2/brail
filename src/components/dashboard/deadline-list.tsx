export type DeadlineItem = {
  title: string;
  course: string;
  due: string;
  tone: "red" | "orange";
};

const dotTone = {
  red: "bg-[#ff2448]",
  orange: "bg-[#ff760f]",
} as const;

export function DeadlineList({ items }: { items: DeadlineItem[] }) {
  return (
    <div className="space-y-10 px-4 py-1">
      {items.map((item) => (
        <article key={`${item.title}-${item.due}`} className="flex gap-4">
          <span
            className={`mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotTone[item.tone]}`}
            aria-hidden="true"
          />
          <div>
            <h3 className="text-xl font-semibold text-neutral-950">
              {item.title}
            </h3>
            <p className="mt-3 text-base text-neutral-500">{item.course}</p>
            <p className="mt-1 text-base text-neutral-500">{item.due}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
