import Link from "next/link";
import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
};

export function Panel({ title, actionLabel, actionHref, children }: PanelProps) {
  return (
    <section className="rounded-[16px] border border-neutral-200 bg-white p-7">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-neutral-950">{title}</h2>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="shrink-0 text-base font-semibold text-[#315bdc] hover:text-[#173ba6]"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
