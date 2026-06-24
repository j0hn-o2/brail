'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-card border border-border rounded-3xl shadow-lg p-8 md:p-12">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/70">Welcome back</p>
          <h1 className="text-4xl font-semibold mt-4">Login to BRAIL</h1>
          <p className="mt-3 text-muted-foreground">Access your study plan, goals, and progress at a glance.</p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push('/dashboard');
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-white text-sm font-semibold shadow-lg shadow-blue-500/10 transition hover:shadow-xl"
          >
            Login
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
