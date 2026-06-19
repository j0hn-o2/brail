export type CalendarDay = {
  day: string;
  date: string;
  load: number;
  focus: string;
  tone: "blue" | "orange" | "purple" | "green" | "gray";
  active?: boolean;
};

const calendarTone = {
  blue: "bg-blue-600",
  orange: "bg-orange-500",
  purple: "bg-purple-600",
  green: "bg-emerald-600",
  gray: "bg-slate-400",
} as const;

type WeeklyCalendarProps = {
  days: CalendarDay[];
  selectedSubject: string;
};

export function WeeklyCalendar({ days, selectedSubject }: WeeklyCalendarProps) {
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[760px] grid-cols-7 gap-3">
        {days.map((day) => {
          const muted =
            selectedSubject !== "All" &&
            day.focus !== selectedSubject &&
            day.focus !== "Review";

          return (
            <article
              key={`${day.day}-${day.date}`}
              className={[
                "min-h-44 rounded-[12px] border p-4 transition",
                day.active
                  ? "border-blue-300 bg-[#eef6ff]"
                  : "border-neutral-200 bg-neutral-50",
                muted ? "opacity-45" : "opacity-100",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-500">
                    {day.day}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-neutral-950">
                    {day.date}
                  </p>
                </div>
                <span
                  className={`h-3 w-3 rounded-full ${calendarTone[day.tone]}`}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-8 space-y-2">
                <div className="flex gap-1.5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={index}
                      className={[
                        "h-1.5 flex-1 rounded-full",
                        index < day.load ? calendarTone[day.tone] : "bg-white",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold text-neutral-800">
                  {day.focus}
                </p>
                <p className="text-xs text-neutral-500">
                  {day.load} planned {day.load === 1 ? "session" : "sessions"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
