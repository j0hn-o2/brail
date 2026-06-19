'use client';

import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Performance() {
  const gpaData = [
    { month: 'Sep', gpa: 3.4 },
    { month: 'Oct', gpa: 3.5 },
    { month: 'Nov', gpa: 3.6 },
    { month: 'Dec', gpa: 3.5 },
    { month: 'Jan', gpa: 3.7 },
    { month: 'Feb', gpa: 3.8 },
    { month: 'Mar', gpa: 3.7 },
  ];

  const subjectPerformance = [
    { subject: 'Calculus', current: 85, previous: 78 },
    { subject: 'Physics', current: 82, previous: 80 },
    { subject: 'CS', current: 92, previous: 90 },
    { subject: 'English', current: 88, previous: 85 },
  ];

  const weeklyProgress = [
    { week: 'Week 1', hours: 18, tasks: 12 },
    { week: 'Week 2', hours: 22, tasks: 15 },
    { week: 'Week 3', hours: 20, tasks: 14 },
    { week: 'Week 4', hours: 24, tasks: 18 },
  ];

  const weakAreas = [
    { topic: 'Integration by Parts', subject: 'Calculus II', score: 65, improvement: -5, attempts: 8 },
    { topic: 'Electromagnetism', subject: 'Physics', score: 70, improvement: +3, attempts: 6 },
    { topic: 'Dynamic Programming', subject: 'Computer Science', score: 72, improvement: +8, attempts: 10 },
    { topic: 'Literary Analysis', subject: 'English', score: 78, improvement: +2, attempts: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">Performance Analytics</h2>
        <p className="text-muted-foreground">Track your progress and identify improvement areas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Current GPA', value: '3.7', change: '+0.2', trend: 'up' },
          { label: 'Average Score', value: '86.8%', change: '+4.2%', trend: 'up' },
          { label: 'Completion Rate', value: '92%', change: '-3%', trend: 'down' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
            <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
            <div className="text-3xl font-semibold mb-2">{stat.value}</div>
            <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">GPA Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gpaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis domain={[3.0, 4.0]} stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="gpa" stroke="url(#colorGpa)" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
              <defs>
                <linearGradient id="colorGpa" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="previous" fill="#94a3b8" name="Previous" radius={[8, 8, 0, 0]} />
              <Bar dataKey="current" fill="#3b82f6" name="Current" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="hours" fill="#8b5cf6" name="Study Hours" radius={[8, 8, 0, 0]} />
              <Bar dataKey="tasks" fill="#f59e0b" name="Tasks Completed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Study Time Distribution</h3>
          </div>
          <div className="space-y-4">
            {[
              { subject: 'Calculus II', hours: 8, percentage: 33, color: 'bg-blue-500' },
              { subject: 'Physics', hours: 7, percentage: 29, color: 'bg-purple-500' },
              { subject: 'Computer Science', hours: 6, percentage: 25, color: 'bg-orange-500' },
              { subject: 'English', hours: 3, percentage: 13, color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.subject}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground">{item.hours}h ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className={`h-full ${item.color} transition-all`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold">Areas Needing Attention</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Topic</th>
                <th className="text-left py-3 px-4 font-medium">Subject</th>
                <th className="text-left py-3 px-4 font-medium">Score</th>
                <th className="text-left py-3 px-4 font-medium">Improvement</th>
                <th className="text-left py-3 px-4 font-medium">Attempts</th>
                <th className="text-left py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {weakAreas.map((area, index) => (
                <tr key={index} className="border-b border-border hover:bg-accent transition-colors">
                  <td className="py-4 px-4 font-medium">{area.topic}</td>
                  <td className="py-4 px-4 text-muted-foreground">{area.subject}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        area.score < 70
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400'
                      }`}
                    >
                      {area.score}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center gap-1 ${area.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {area.improvement > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{area.improvement > 0 ? '+' : ''}{area.improvement}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{area.attempts}</td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Practice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
