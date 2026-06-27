'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LayoutDashboard, Calendar, TrendingUp, Target, Users, MessageSquare, User, Moon, Sun, LifeBuoy, MessageCircle, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { signOut, useSession } from 'next-auth/react';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'User';
  const userEmail = session?.user?.email ?? '';
  const userInitial = userName.charAt(0).toUpperCase() || 'U';

  const topNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'planner', label: 'Study Planner', icon: Calendar, href: '/planner' },
    { id: 'peers', label: 'Peer Support', icon: Users, href: '/peers' },
    { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, href: '/ai-chat' },
  ];

  const menuNavItems = [
    { id: 'semester', label: 'Semester', icon: Target, href: '/semester' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, href: '/performance' },
    { id: 'goals', label: 'Goals', icon: Target, href: '/goals' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (menuOpen) {
      html.classList.add('sidebar-open');
    } else {
      html.classList.remove('sidebar-open');
    }

    return () => {
      html.classList.remove('sidebar-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        showProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showProfileMenu]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {!menuOpen ? (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-neutral-900 shadow-sm hover:bg-slate-100"
              aria-label="Open left menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          ) : null}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-neutral-500">BRAIL</p>
              <p className="text-xs text-neutral-500">Academic Planner</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-16">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-3xl px-5 py-2.5 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-700 hover:bg-slate-100 hover:text-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors"
              aria-label="Open profile menu"
            >
              {userInitial}
            </button>
            {showProfileMenu ? (
              <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-slate-900/10">
                <div className="border-b border-border px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-950">{userName}</p>
                      <p className="text-xs text-neutral-500">{userEmail}</p>
                    </div>
                  </div>
                </div>
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
                    onClick={() => {
                      setShowProfileMenu(false);
                      void signOut({ callbackUrl: '/login' });
                    }}
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

      {menuOpen ? (
        <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-card p-5 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">More Pages</p>
              <p className="text-xs text-neutral-500">Opened from hamburger</p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-neutral-900 shadow-sm"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      ) : null}
    </header>
  );
}
