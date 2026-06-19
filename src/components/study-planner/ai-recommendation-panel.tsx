import { Sparkles, WandSparkles } from "lucide-react";

export type Recommendation = {
  title: string;
  detail: string;
};

type AiRecommendationPanelProps = {
  recommendations: Recommendation[];
  selectedSubject: string;
};

export function AiRecommendationPanel({
  recommendations,
  selectedSubject,
}: AiRecommendationPanelProps) {
  return (
    <section className="rounded-[16px] border border-neutral-200 bg-[#050416] p-7 text-white">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-blue-200">
            <Sparkles className="h-4 w-4" />
            AI Recommendation
          </p>
          <h2 className="text-2xl font-semibold">
            {selectedSubject === "All"
              ? "Best plan for today"
              : `${selectedSubject} focus plan`}
          </h2>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-white/10">
          <WandSparkles className="h-6 w-6 text-blue-200" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {recommendations.map((item, index) => (
          <article
            key={item.title}
            className="rounded-[12px] border border-white/10 bg-white/[0.06] p-4"
          >
            <div className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#050416]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {item.detail}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-white text-sm font-semibold text-[#050416] transition hover:bg-blue-50"
      >
        <Sparkles className="h-4 w-4" />
        Apply recommendation
      </button>
    </section>
  );
}
