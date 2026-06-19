import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
};

type HeaderNavProps = {
  items: NavItem[];
  actionIcon: LucideIcon;
};

export function HeaderNav({ items, actionIcon: ActionIcon }: HeaderNavProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-[1268px] items-center gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-gradient-to-br from-[#2f7ef6] to-[#a434f5] text-xl font-bold text-white shadow-sm">
            B
          </span>
          <span className="text-2xl font-semibold text-[#315bdc]">BRAIL</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden flex-1 items-center justify-center gap-3 lg:flex"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "flex h-12 items-center gap-3 rounded-[10px] px-5 text-lg font-semibold transition",
                item.active
                  ? "bg-[#050416] text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900",
              ].join(" ")}
            >
              <item.icon className="h-5 w-5" strokeWidth={2} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex max-w-[calc(100vw-150px)] gap-2 overflow-x-auto lg:hidden">
            {items.slice(0, 4).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={[
                  "grid h-11 w-11 shrink-0 place-items-center rounded-[10px]",
                  item.active
                    ? "bg-[#050416] text-white"
                    : "text-neutral-500 hover:bg-neutral-100",
                ].join(" ")}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label="Toggle theme"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-neutral-950 transition hover:bg-neutral-100"
          >
            <ActionIcon className="h-6 w-6" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </header>
  );
}
