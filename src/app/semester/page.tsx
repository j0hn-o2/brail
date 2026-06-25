'use client';

import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const timetableSlots = [
  '12am',
  '2am',
  '4am',
  '6am',
  '8am',
  '10am',
  '12pm',
  '2pm',
  '4pm',
  '6pm',
  '8pm',
  '10pm',
] as const;

export default function SemesterPage() {
  const [cwa, setCwa] = useState('');
  const [courses, setCourses] = useState('');
  const [unavailable, setUnavailable] = useState<boolean[][]>(
    Array.from({ length: weekDays.length }, () => Array(timetableSlots.length).fill(false)),
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/10">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Semester Overview</p>
            <h1 className="text-3xl font-semibold text-neutral-950">Track your semester progress</h1>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500">
          Add your cumulative weighted average, semester course list, and weekly unavailable times to help the planner build smarter study recommendations.
        </p>
      </div>

      <div className="grid gap-7">
        <form onSubmit={handleSave} className="rounded-[20px] border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-neutral-900">Cumulative Weighted Average</label>
              <input
                type="number"
                value={cwa}
                onChange={(event) => setCwa(event.target.value)}
                placeholder="Enter your CWA"
                className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                step="0.01"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-neutral-900">Semester Courses</label>
              <p className="mt-2 text-sm text-neutral-500">Enter one course per line, including course code and credit weight.</p>
              <textarea
                value={courses}
                onChange={(event) => setCourses(event.target.value)}
                placeholder="e.g. CS101 - Software Engineering - 3.0\nMATH221 - Calculus II - 4.0"
                className="mt-3 w-full min-h-[180px] rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-xl transition"
            >
              <Plus className="w-4 h-4" />
              Save Semester Data
            </button>

            {saved ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Semester details saved successfully.
              </div>
            ) : null}
          </div>
        </form>

        <section className="rounded-[20px] border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-neutral-950">Weekly Unavailable Times</h2>
          </div>
          <p className="mb-4 text-sm text-neutral-500">
            Select the weekly blocks when you are unavailable so your semester plan avoids study sessions during class hours and busy periods.
          </p>
          <div className="overflow-x-auto rounded-[20px] border border-neutral-200 bg-neutral-50 p-2">
            <div className="grid min-w-[1024px] grid-cols-[140px_repeat(12,minmax(0,1fr))] gap-px bg-neutral-200">
              <div className="bg-white px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                Day
              </div>
              {timetableSlots.map((slot) => (
                <div
                  key={slot}
                  className="bg-white px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
                >
                  {slot}
                </div>
              ))}

              {weekDays.map((day, dayIndex) => (
                <div className="contents" key={day}>
                  <div className="bg-white px-3 py-3 text-sm font-medium text-neutral-700">
                    {day}
                  </div>
                  {timetableSlots.map((slot, slotIndex) => {
                    const active = unavailable[dayIndex][slotIndex];
                    return (
                      <button
                        key={`${day}-${slot}`}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setUnavailable((prev) => {
                            const next = prev.map((row) => [...row]);
                            next[dayIndex][slotIndex] = !next[dayIndex][slotIndex];
                            return next;
                          })
                        }
                        className={`min-h-[64px] p-3 text-left text-sm transition ${
                          active
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-neutral-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-xs font-semibold">
                          {active ? 'Busy' : 'Free'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
