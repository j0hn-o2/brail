import Link from 'next/link';

export default function FeedbackPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl shadow-slate-900/5">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.32em] text-blue-500">Feedback</p>
          <h1 className="text-4xl font-semibold">Share your experience</h1>
          <p className="max-w-2xl text-muted-foreground">
            Let us know how BRAIL is helping you, and where we can improve your study and AI tools.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Your feedback matters</h2>
          <textarea
            placeholder="Tell us what you love, and what you'd like to see next."
            className="w-full min-h-[200px] rounded-3xl border border-border bg-slate-50 px-4 py-4 text-sm text-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button className="mt-4 rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
            Submit Feedback
          </button>
        </div>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold mb-3">Need help instead?</h2>
          <Link href="/support" className="rounded-2xl border border-border bg-background px-4 py-3 hover:bg-accent transition">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
