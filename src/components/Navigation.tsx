'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Calendar, TrendingUp, Target, Users, MessageSquare, User, Moon, Sun, LifeBuoy, MessageCircle, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const userInitial = 'A';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'planner', label: 'Study Planner', icon: Calendar, href: '/planner' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, href: '/performance' },
    { id: 'goals', label: 'Goals', icon: Target, href: '/goals' },
    { id: 'peers', label: 'Peer Support', icon: Users, href: '/peers' },
    { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, href: '/ai-chat' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BRAIL
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((current) => !current)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors"
                aria-label="Open profile menu"
              >
                {userInitial}
              </button>
              {showProfileMenu ? (
                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-slate-900/10">
                  <div className="space-y-1 p-3">
                    <button
                      type="button"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground hover:bg-accent transition"
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                    </button>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground hover:bg-accent transition"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/support"
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground hover:bg-accent transition"
                    >
                      <LifeBuoy className="w-4 h-4" />
                      Support
                    </Link>
                    <Link
                      href="/feedback"
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground hover:bg-accent transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Feedback
                    </Link>
                    <button
                      type="button"
                      className="mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground hover:bg-accent transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="md:hidden flex gap-1 overflow-x-auto pb-2 -mx-4 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm whitespace-nowrap transition-all ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
