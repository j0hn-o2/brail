type SubjectFilterProps = {
  subjects: string[];
  selectedSubject: string;
  onSelect: (subject: string) => void;
};

export function SubjectFilter({
  subjects,
  selectedSubject,
  onSelect,
}: SubjectFilterProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-neutral-200 bg-white p-3 sm:flex-row sm:items-center">
      <p className="px-2 text-sm font-semibold text-neutral-500">
        Filter by Subject
      </p>
      <div className="flex gap-2 overflow-x-auto">
        {subjects.map((subject) => (
          <button
            key={subject}
            type="button"
            onClick={() => onSelect(subject)}
            className={[
              "h-10 shrink-0 rounded-[9px] px-4 text-sm font-semibold transition",
              selectedSubject === subject
                ? "bg-[#050416] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950",
            ].join(" ")}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}
