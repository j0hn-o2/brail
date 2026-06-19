import type { LucideIcon } from "lucide-react";

type FloatingActionsProps = {
  primaryIcon: LucideIcon;
  secondaryIcon: LucideIcon;
  alertCount?: number;
};

export function FloatingActions({
  primaryIcon: PrimaryIcon,
  secondaryIcon: SecondaryIcon,
  alertCount,
}: FloatingActionsProps) {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-end gap-2">
      <button
        type="button"
        aria-label="Open AI chat"
        className="relative grid h-[70px] w-[70px] place-items-center rounded-full bg-gradient-to-br from-[#3c72ff] to-[#a418f0] text-white shadow-[0_12px_22px_rgba(74,67,224,0.35)] transition hover:scale-[1.02]"
      >
        <PrimaryIcon className="h-8 w-8" />
        {alertCount ? (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#ff6a72] text-xs font-bold">
            {alertCount}
          </span>
        ) : null}
      </button>

      <button
        type="button"
        aria-label="Open help"
        className="grid h-11 w-11 place-items-center rounded-full bg-neutral-900 text-white shadow-lg transition hover:bg-black"
      >
        <SecondaryIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
