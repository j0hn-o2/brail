import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.18),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.16),_transparent_35%),rgb(var(--color-background))] py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm shadow-blue-200">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                AI-powered planning for every study session
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground">
                  Plan smarter, study better, reach your academic goals.
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  BRAIL helps students build personalized study schedules, track progress, and get peer support with AI-driven recommendations designed to keep you focused and moving forward.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-xl"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  Login
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {[
                  {
                    title: 'Daily study plans',
                    text: 'Auto-generated routines tailored to your classes and deadlines.',
                  },
                  {
                    title: 'Progress insights',
                    text: 'Visualize performance trends and stay motivated.',
                  },
                  {
                    title: 'Peer support',
                    text: 'Find study partners and stay connected with classmates.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-border bg-white/90 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:bg-slate-950/70 dark:shadow-slate-950/20">
              <div className="absolute inset-x-6 top-6 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 p-4 text-white shadow-lg shadow-blue-500/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] opacity-90">Study snapshot</p>
                    <p className="mt-2 text-2xl font-semibold">Weekly focus</p>
                  </div>
                  <div className="rounded-2xl bg-white/15 px-3 py-2 text-sm">AI</div>
                </div>
              </div>

              <div className="mt-36 space-y-5">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/95 p-5 text-white shadow-md shadow-slate-950/10">
                  <div>
                    <p className="text-sm uppercase opacity-80">Next session</p>
                    <p className="mt-2 text-xl font-semibold">Calculus review</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-75">Starts in</p>
                    <p className="mt-2 text-2xl font-semibold">45m</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Upcoming</p>
                    <ul className="mt-4 space-y-3 text-sm text-foreground">
                      <li>📘 Physics quiz prep</li>
                      <li>🧠 Data structures review</li>
                      <li>✍️ English essay outline</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Highlights</p>
                    <ol className="mt-4 space-y-3 text-sm text-foreground">
                      <li>✅ Smart reminders</li>
                      <li>📊 Performance charts</li>
                      <li>🤝 Study buddies</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] border border-blue-200/60 bg-slate-50 p-5 text-sm text-slate-700 shadow-inner shadow-blue-100/40 dark:bg-slate-900 dark:text-slate-200">
                <p className="font-semibold">How it works</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add classes, deadlines, and preferences. BRAIL suggests the best study blocks, tracks your progress, and connects you with peers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                label: 'Organize every course',
                title: 'Structured study plans',
                description: 'Keep your syllabus, deadlines, and exam prep in one central workspace.',
              },
              {
                label: 'Track your progress',
                title: 'Performance metrics',
                description: 'Monitor your strengths, weaknesses, and weekly achievements with visual analytics.',
              },
              {
                label: 'Connect with peers',
                title: 'Study groups and support',
                description: 'Share resources, compare notes, and collaborate with classmates when it matters most.',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">{card.label}</p>
                <h2 className="mt-4 text-2xl font-semibold">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
