'use client';

import Link from 'next/link';
import { TrendingUp, Calendar, BookOpen, Award } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function Dashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'there';
  const stats = [
    { label: 'Current GPA', value: '3.7', change: '+0.2', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
    { label: 'Study Hours', value: '24h', change: '+8h', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { label: 'Tasks Due', value: '5', change: '2 today', icon: Calendar, color: 'from-orange-500 to-orange-600' },
    { label: 'Study Streak', value: '12d', change: 'Keep it up!', icon: Award, color: 'from-green-500 to-green-600' },
  ];

  const upcomingTasks = [
    { subject: 'Calculus II', task: 'Problem Set 5', due: 'Today, 11:59 PM', priority: 'high' },
    { subject: 'Physics', task: 'Lab Report 3', due: 'Tomorrow, 5:00 PM', priority: 'medium' },
    { subject: 'Computer Science', task: 'Project Milestone 2', due: 'Mar 30, 11:59 PM', priority: 'high' },
    { subject: 'English', task: 'Essay Draft', due: 'Apr 2, 9:00 AM', priority: 'low' },
  ];

  const weakAreas = [
    { subject: 'Calculus II', topic: 'Integration by Parts', score: 65 },
    { subject: 'Physics', topic: 'Electromagnetism', score: 70 },
    { subject: 'Computer Science', topic: 'Dynamic Programming', score: 72 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">Welcome back, {userName}! 👋</h2>
        <p className="text-muted-foreground">Here&apos;s your academic overview for today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-semibold mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm mb-1">{stat.label}</div>
              <div className="text-green-600 dark:text-green-400 text-sm">{stat.change}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">AI Study Plan for Today</h3>
            <Link
              href="/planner"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Full Plan
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { time: '2:00 PM - 3:30 PM', subject: 'Calculus II', topic: 'Integration Practice', priority: true },
              { time: '4:00 PM - 5:00 PM', subject: 'Physics', topic: 'Lab Report Writing', priority: false },
              { time: '7:00 PM - 8:30 PM', subject: 'Computer Science', topic: 'Algorithm Review', priority: true },
            ].map((session, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  session.priority
                    ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
                    : 'bg-muted border-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{session.time}</div>
                    <div className="font-medium mb-1">{session.subject}</div>
                    <div className="text-sm text-muted-foreground">{session.topic}</div>
                  </div>
                  {session.priority && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">Priority</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
            <Link
              href="/planner"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1">
                  <div className="font-medium mb-1">{task.task}</div>
                  <div className="text-sm text-muted-foreground mb-1">{task.subject}</div>
                  <div className="text-xs text-muted-foreground">{task.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Areas Needing Attention</h3>
            <Link
              href="/performance"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Analysis
            </Link>
          </div>
          <div className="space-y-4">
            {weakAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{area.topic}</div>
                    <div className="text-sm text-muted-foreground">{area.subject}</div>
                  </div>
                  <div className="text-orange-600 dark:text-orange-400 font-medium">{area.score}%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
                    style={{ width: `${area.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/ai-chat"
            className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Ask AI for Help
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Study Partner Suggestions</h3>
            <Link
              href="/peers"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Find More
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', courses: ['Calculus II', 'Physics'], status: 'online', avatar: 'SJ' },
              { name: 'Michael Chen', courses: ['Computer Science', 'Calculus II'], status: 'online', avatar: 'MC' },
              { name: 'Emily Davis', courses: ['Physics', 'Chemistry'], status: 'offline', avatar: 'ED' },
            ].map((peer, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {peer.avatar}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                      peer.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">{peer.name}</div>
                  <div className="text-sm text-muted-foreground">{peer.courses.join(', ')}</div>
                </div>
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
