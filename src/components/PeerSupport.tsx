'use client';

import { Users, MessageCircle, Search, Plus, Video } from 'lucide-react';
import { useState } from 'react';

export function PeerSupport() {
  const [selectedTab, setSelectedTab] = useState('matches');

  const studyMatches = [
    {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      courses: ['Calculus II', 'Physics'],
      status: 'online',
      compatibility: 95,
      studyHours: '20h/week',
      timezone: 'EST',
    },
    {
      name: 'Michael Chen',
      avatar: 'MC',
      courses: ['Computer Science', 'Calculus II'],
      status: 'online',
      compatibility: 92,
      studyHours: '25h/week',
      timezone: 'PST',
    },
    {
      name: 'Emily Davis',
      avatar: 'ED',
      courses: ['Physics', 'Chemistry'],
      status: 'offline',
      compatibility: 88,
      studyHours: '18h/week',
      timezone: 'EST',
    },
    {
      name: 'James Wilson',
      avatar: 'JW',
      courses: ['English', 'History'],
      status: 'online',
      compatibility: 85,
      studyHours: '15h/week',
      timezone: 'CST',
    },
  ];

  const studyGroups = [
    {
      name: 'Calculus Warriors',
      subject: 'Calculus II',
      members: 8,
      active: true,
      nextSession: 'Today, 3:00 PM',
      description: 'Focus on integration and differential equations',
    },
    {
      name: 'Physics Problem Solvers',
      subject: 'Physics',
      members: 12,
      active: true,
      nextSession: 'Tomorrow, 2:00 PM',
      description: 'Weekly problem-solving sessions',
    },
    {
      name: 'CS Study Circle',
      subject: 'Computer Science',
      members: 15,
      active: true,
      nextSession: 'Mar 30, 6:00 PM',
      description: 'Algorithms and data structures practice',
    },
  ];

  const qaBoard = [
    {
      question: 'How do I approach integration by substitution?',
      author: 'Alex M.',
      subject: 'Calculus II',
      answers: 5,
      votes: 12,
      time: '2h ago',
    },
    {
      question: "Can someone explain Newton's laws with real examples?",
      author: 'Jordan P.',
      subject: 'Physics',
      answers: 8,
      votes: 15,
      time: '4h ago',
    },
    {
      question: 'Best resources for learning recursion?',
      author: 'Taylor K.',
      subject: 'Computer Science',
      answers: 12,
      votes: 20,
      time: '6h ago',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">Peer Support System</h2>
        <p className="text-muted-foreground">Connect, collaborate, and learn together</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
        {[
          { id: 'matches', label: 'Study Matches' },
          { id: 'groups', label: 'Study Groups' },
          { id: 'qa', label: 'Q&A Board' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 whitespace-nowrap transition-colors ${
              selectedTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {selectedTab === 'matches' && (
        <div>
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by course, interests, or availability..."
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                Find Study Partners
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyMatches.map((match, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold">
                      {match.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${
                        match.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{match.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{match.studyHours}</span>
                      <span aria-hidden="true">/</span>
                      <span>{match.timezone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600"
                          style={{ width: `${match.compatibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-green-600">{match.compatibility}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {match.courses.map((course) => (
                    <span key={course} className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                      {course}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'groups' && (
        <div>
          <div className="flex justify-end mb-6">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              Create Study Group
            </button>
          </div>

          <div className="space-y-4">
            {studyGroups.map((group, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{group.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded-full">
                          {group.subject}
                        </span>
                        <span className="text-muted-foreground">{group.members} members</span>
                        {group.active && (
                          <span className="flex items-center gap-1 text-green-600">
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                            Active now
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="text-right lg:mr-4">
                      <div className="text-sm text-muted-foreground mb-1">Next Session</div>
                      <div className="font-medium">{group.nextSession}</div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'qa' && (
        <div>
          <div className="flex justify-end mb-6">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              Ask Question
            </button>
          </div>

          <div className="space-y-4">
            {qaBoard.map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2 min-w-[60px]">
                    <button className="w-10 h-10 rounded-lg border border-border hover:bg-accent transition-colors flex items-center justify-center">
                      Up
                    </button>
                    <span className="font-semibold">{item.votes}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 hover:text-primary cursor-pointer font-medium">{item.question}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded-full">
                        {item.subject}
                      </span>
                      <span className="text-muted-foreground">by {item.author}</span>
                      <span className="text-muted-foreground">{item.time}</span>
                    </div>
                    <button className="text-sm text-primary hover:underline flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {item.answers} answers
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
