import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl shadow-slate-900/5">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.32em] text-blue-500">Support</p>
          <h1 className="text-4xl font-semibold">Need help?</h1>
          <p className="max-w-2xl text-muted-foreground">
            Find answers, report issues, or reach out for help with your study planner and AI tools.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Common Questions</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>How do I update my study schedule?</li>
              <li>How can I change my theme or account settings?</li>
              <li>What should I do if my AI plan is not accurate?</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
            <p className="text-sm text-muted-foreground">
              If you need more help, send us a message and we&apos;ll respond as soon as possible.
            </p>
            <button className="mt-6 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
              Message Support
            </button>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/profile" className="rounded-2xl border border-border bg-background px-4 py-3 hover:bg-accent transition">
              Account Settings
            </Link>
            <Link href="/feedback" className="rounded-2xl border border-border bg-background px-4 py-3 hover:bg-accent transition">
              Provide Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
