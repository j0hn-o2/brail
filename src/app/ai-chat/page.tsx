import Link from 'next/link';

export default function AIChatPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl shadow-slate-900/5">
        <div className="mb-8 flex flex-col gap-2">
          <div className="text-sm uppercase tracking-[0.32em] text-blue-500">AI Support</div>
          <h1 className="text-4xl font-semibold">Ask BRAIL for help</h1>
          <p className="max-w-2xl text-muted-foreground">
            Get study plan suggestions, task recommendations, or quick academic support in a dedicated chat experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.18em] mb-4">Type your question</p>
              <textarea
                placeholder="How can I study for my physics exam?"
                className="w-full min-h-[220px] rounded-3xl border border-border bg-slate-50 px-4 py-4 text-sm text-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition-shadow">
                Send to AI
              </button>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Chat tips</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Ask for a study plan based on your deadlines.</li>
                <li>• Request help refining your revision schedule.</li>
                <li>• Ask for tips on improving focus and time management.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white shadow-xl">
              <h2 className="text-lg font-semibold mb-3">Ready to chat?</h2>
              <p className="text-sm text-slate-200">
                This page is a dedicated hub for AI-powered academic support. Use it to ask about schedules, assignments, exam prep, or study strategies.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Quick actions</h2>
              <div className="grid gap-3">
                <Link href="/planner" className="rounded-2xl border border-border bg-background px-4 py-3 text-sm hover:bg-accent transition">
                  View my Study Planner
                </Link>
                <Link href="/dashboard" className="rounded-2xl border border-border bg-background px-4 py-3 text-sm hover:bg-accent transition">
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
