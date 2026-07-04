'use client';

import { Award, Flame, Handshake, Rocket, Target, Plus, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react';

export function Goals() {
  const semesterGoals = [
    {
      title: 'Achieve 3.8 GPA',
      current: 3.7,
      target: 3.8,
      progress: 87,
      category: 'Academic',
      deadline: 'End of Semester',
      status: 'in-progress',
    },
    {
      title: 'Complete 120 Study Hours',
      current: 96,
      target: 120,
      progress: 80,
      category: 'Study Time',
      deadline: '4 weeks left',
      status: 'in-progress',
    },
    {
      title: 'Master Integration Techniques',
      current: 65,
      target: 85,
      progress: 76,
      category: 'Subject Mastery',
      deadline: 'Apr 15',
      status: 'needs-attention',
    },
    {
      title: 'Join 5 Study Groups',
      current: 5,
      target: 5,
      progress: 100,
      category: 'Collaboration',
      deadline: 'Completed',
      status: 'completed',
    },
  ];

  const weeklyGoals = [
    { title: 'Complete all assignments on time', completed: true },
    { title: 'Study 30 hours this week', completed: false, current: 24, target: 30 },
    { title: 'Practice calculus problems daily', completed: true },
    { title: 'Attend all study group sessions', completed: false, current: 2, target: 3 },
    { title: 'Review lecture notes within 24 hours', completed: true },
  ];

  const achievements = [
    { title: 'Week Warrior', description: '7-day study streak', icon: Flame, color: 'from-orange-500 to-red-600' },
    { title: 'Perfect Week', description: '100% task completion', icon: Award, color: 'from-blue-500 to-purple-600' },
    { title: 'Team Player', description: 'Helped 10 peers', icon: Handshake, color: 'from-green-500 to-emerald-600' },
    { title: 'Fast Learner', description: '+15% improvement', icon: Rocket, color: 'from-pink-500 to-rose-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Goals & Achievements</h2>
          <p className="text-muted-foreground">Track your progress towards academic success</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.title}
              className={`bg-gradient-to-br ${achievement.color} rounded-xl p-6 text-white hover:shadow-xl transition-shadow`}
            >
              <Icon className="mb-3 h-9 w-9 text-white" />
              <h4 className="text-white mb-1 font-semibold">{achievement.title}</h4>
              <p className="text-white/90 text-sm">{achievement.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Semester Goals</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {semesterGoals.filter((g) => g.status === 'completed').length} of {semesterGoals.length} completed
              </span>
            </div>
            <div className="space-y-6">
              {semesterGoals.map((goal, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{goal.title}</h4>
                        {goal.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded-full">{goal.category}</span>
                        <span>Deadline: {goal.deadline}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {goal.current} / {goal.target}
                      </div>
                      <div className="text-sm text-muted-foreground">{goal.progress}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        goal.status === 'completed'
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : goal.status === 'needs-attention'
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">This Week&apos;s Goals</h3>
            </div>
            <div className="space-y-3">
              {weeklyGoals.map((goal, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-colors ${
                    goal.completed
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                      : 'bg-muted border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        goal.completed
                          ? 'bg-green-600 border-green-600'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {goal.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className={goal.completed ? 'line-through text-muted-foreground' : 'font-medium'}>{goal.title}</div>
                      {!goal.completed && 'current' in goal && 'target' in goal && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {goal.current} / {goal.target}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <Trophy className="w-12 h-12 text-white mb-4" />
            <h3 className="text-white mb-2 font-semibold">Weekly Progress</h3>
            <div className="text-3xl font-semibold mb-1">87%</div>
            <p className="text-white/90 text-sm mb-4">You&apos;re doing great! Keep up the momentum.</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% from last week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Progress Timeline</h3>
        <div className="space-y-4">
          {[
            { date: 'Mar 28', event: 'Completed Physics Lab Report', type: 'achievement' },
            { date: 'Mar 26', event: 'Reached 3.7 GPA milestone', type: 'milestone' },
            { date: 'Mar 24', event: 'Started new study group', type: 'activity' },
            { date: 'Mar 22', event: 'Improved Calculus score by 10%', type: 'achievement' },
            { date: 'Mar 20', event: '7-day study streak achieved', type: 'milestone' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="text-sm text-muted-foreground min-w-[60px] mt-1">{item.date}</div>
              <div
                className={`w-3 h-3 rounded-full mt-1.5 ${
                  item.type === 'milestone'
                    ? 'bg-purple-600'
                    : item.type === 'achievement'
                    ? 'bg-green-600'
                    : 'bg-blue-600'
                }`}
              />
              <div className="flex-1 pb-4 border-l-2 border-border pl-4 -ml-1.5">
                <div className="font-medium mb-1">{item.event}</div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.type === 'milestone'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
                      : item.type === 'achievement'
                      ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                  }`}
                >
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
