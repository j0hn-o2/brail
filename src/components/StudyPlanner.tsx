'use client';

import { Calendar, Clock, Plus, Settings, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function StudyPlanner() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const scheduleData: Record<string, Array<{ time: string; subject: string; task: string; duration: string; priority: string }>> = {
    Monday: [
      { time: '09:00 AM', subject: 'Calculus II', task: 'Lecture Review', duration: '1.5h', priority: 'high' },
      { time: '02:00 PM', subject: 'Physics', task: 'Problem Set', duration: '2h', priority: 'high' },
      { time: '06:00 PM', subject: 'English', task: 'Reading Assignment', duration: '1h', priority: 'medium' },
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'Computer Science', task: 'Project Work', duration: '2h', priority: 'high' },
      { time: '03:00 PM', subject: 'Calculus II', task: 'Practice Problems', duration: '1.5h', priority: 'medium' },
      { time: '07:00 PM', subject: 'Physics', task: 'Lab Report', duration: '1h', priority: 'medium' },
    ],
    Wednesday: [
      { time: '09:00 AM', subject: 'English', task: 'Essay Writing', duration: '2h', priority: 'high' },
      { time: '02:00 PM', subject: 'Calculus II', task: 'Integration Practice', duration: '1.5h', priority: 'high' },
      { time: '05:00 PM', subject: 'Computer Science', task: 'Algorithm Study', duration: '1.5h', priority: 'medium' },
    ],
    Thursday: [
      { time: '10:00 AM', subject: 'Physics', task: 'Lecture Notes', duration: '1.5h', priority: 'medium' },
      { time: '02:00 PM', subject: 'Computer Science', task: 'Code Review', duration: '2h', priority: 'high' },
      { time: '06:00 PM', subject: 'Calculus II', task: 'Weak Areas Focus', duration: '1.5h', priority: 'high' },
    ],
    Friday: [
      { time: '09:00 AM', subject: 'English', task: 'Peer Review', duration: '1h', priority: 'low' },
      { time: '01:00 PM', subject: 'Physics', task: 'Exam Prep', duration: '2h', priority: 'high' },
      { time: '04:00 PM', subject: 'Calculus II', task: 'Quiz Review', duration: '1h', priority: 'medium' },
    ],
    Saturday: [
      { time: '10:00 AM', subject: 'Computer Science', task: 'Project Sprint', duration: '3h', priority: 'high' },
      { time: '03:00 PM', subject: 'General', task: 'Weak Topics Review', duration: '2h', priority: 'high' },
    ],
    Sunday: [
      { time: '11:00 AM', subject: 'General', task: 'Weekly Review', duration: '2h', priority: 'medium' },
      { time: '03:00 PM', subject: 'General', task: 'Next Week Planning', duration: '1h', priority: 'low' },
    ],
  };

  const schedule = scheduleData[selectedDay] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2">AI Study Planner</h2>
          <p className="text-muted-foreground">Personalized schedule optimized for your success</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow">
            <Sparkles className="w-4 h-4" />
            Regenerate Plan
          </button>
          <button className="p-2 border border-border rounded-lg hover:bg-accent transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Week of March 24 - March 30, 2026</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{selectedDay}'s Schedule</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" />
                Add Session
              </button>
            </div>
            <div className="space-y-4">
              {schedule.map((session, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    session.priority === 'high'
                      ? 'bg-red-50 dark:bg-red-950/20 border-red-500'
                      : session.priority === 'medium'
                      ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-500'
                      : 'bg-green-50 dark:bg-green-950/20 border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="text-muted-foreground text-sm mt-1 min-w-[80px]">{session.time}</div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{session.subject}</div>
                        <div className="text-sm text-muted-foreground mb-2">{session.task}</div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{session.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-border rounded-lg text-sm hover:bg-accent transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Study Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Weekly Hours</span>
                  <span className="font-medium">24 / 30h</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all" style={{ width: '80%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">12 / 18</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all" style={{ width: '67%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Focus Time</span>
                  <span className="font-medium">18h</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 mt-1" />
              <div>
                <h3 className="text-white mb-2 font-semibold">AI Recommendation</h3>
                <p className="text-white/90 text-sm">
                  Your integration skills need attention. Consider spending extra time on practice problems this week.
                </p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors font-medium">
              Adjust Schedule
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
            <div className="space-y-3">
              {[
                { subject: 'Calculus II', hours: 8, color: 'from-blue-500 to-blue-600' },
                { subject: 'Physics', hours: 7, color: 'from-purple-500 to-purple-600' },
                { subject: 'Computer Science', hours: 6, color: 'from-orange-500 to-orange-600' },
                { subject: 'English', hours: 3, color: 'from-green-500 to-green-600' },
              ].map((item) => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{item.subject}</span>
                    <span className="text-sm text-muted-foreground">{item.hours}h</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} transition-all`}
                      style={{ width: `${(item.hours / 24) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
