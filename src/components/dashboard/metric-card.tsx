import type { LucideIcon } from "lucide-react";

const iconTone = {
  blue: "bg-[#2676f1] text-white",
  purple: "bg-gradient-to-br from-[#c235f3] to-[#9724e9] text-white",
  orange: "bg-[#fa560e] text-white",
  green: "bg-[#06bd5b] text-white",
} as const;

export type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: keyof typeof iconTone;
  elevated?: boolean;
};

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
  elevated,
}: MetricCardProps) {
  return (
    <article
      className={[
        "min-h-60 rounded-[16px] border border-neutral-200 bg-white p-8",
        elevated ? "shadow-[0_18px_30px_rgba(0,0,0,0.14)]" : "",
      ].join(" ")}
    >
      <div
        className={`grid h-[60px] w-[60px] place-items-center rounded-[11px] ${iconTone[tone]}`}
      >
        <Icon className="h-8 w-8" strokeWidth={2.2} />
      </div>

      <p className="mt-6 text-4xl font-semibold tracking-normal text-black">
        {value}
      </p>
      <p className="mt-2 text-lg text-neutral-500">{label}</p>
      <p className="mt-2 text-base font-medium text-emerald-700">{detail}</p>
    </article>
  );
}
