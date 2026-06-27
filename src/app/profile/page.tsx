'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'User';
  const userEmail = session?.user?.email ?? 'No email available';
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl shadow-slate-900/5">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.32em] text-blue-500">Account</div>
          <h1 className="text-4xl font-semibold">Profile & Settings</h1>
          <p className="max-w-2xl text-muted-foreground">
            Manage your theme, password, and profile details in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="font-medium text-foreground">Name</p>
                  <p>{userName}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p>{userEmail}</p>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-4">
                <p className="font-medium text-foreground">Password</p>
                <p className="mt-1">************</p>
                <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Theme</h2>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode in the navigation or planner settings.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <div className="grid gap-3">
                <Link href="/planner" className="rounded-2xl border border-border bg-background px-4 py-3 text-sm hover:bg-accent transition">
                  Go to Study Planner
                </Link>
                <Link href="/ai-chat" className="rounded-2xl border border-border bg-background px-4 py-3 text-sm hover:bg-accent transition">
                  Open AI Chat
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
