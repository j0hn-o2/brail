'use client';

import Link from 'next/link';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  ImageUp,
  Lock,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

type TimetableRow = {
  id: string;
  courseCode: string;
  courseName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  venue: string;
  confidence: number;
};

type GeneratedSession = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subject: string;
  task: string;
  durationMinutes: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
};

type GenerateSummary = {
  classCount: number;
  courseCount: number;
  plannedHours: number;
};

type PlannerPreferences = {
  sessionLength: number;
  preferredStart: string;
  preferredEnd: string;
  intensity: 'light' | 'balanced' | 'intense';
};

const fallbackSchedule: Record<string, GeneratedSession[]> = {
  Monday: [
    {
      id: 'sample-1',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      subject: 'Calculus II',
      task: 'Lecture Review',
      durationMinutes: 90,
      priority: 'high',
      reason: 'Sample session shown until you generate a plan.',
    },
  ],
  Tuesday: [
    {
      id: 'sample-2',
      dayOfWeek: 'Tuesday',
      startTime: '10:00',
      endTime: '11:00',
      subject: 'Computer Science',
      task: 'Project Work',
      durationMinutes: 60,
      priority: 'medium',
      reason: 'Sample session shown until you generate a plan.',
    },
  ],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

function emptyRow(): TimetableRow {
  return {
    id: crypto.randomUUID(),
    courseCode: '',
    courseName: '',
    dayOfWeek: 'Monday',
    startTime: '08:00',
    endTime: '10:00',
    venue: '',
    confidence: 1,
  };
}

function formatTime(value: string) {
  const [hourValue, minuteValue] = value.split(':');
  const hours = Number(hourValue);
  const minutes = Number(minuteValue);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}

function updateRow(rows: TimetableRow[], id: string, key: keyof TimetableRow, value: string | number) {
  return rows.map((row) => (row.id === id ? { ...row, [key]: value } : row));
}

export function StudyPlanner() {
  const { theme, setTheme } = useTheme();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [timetableImage, setTimetableImage] = useState<File | null>(null);
  const [extractedRows, setExtractedRows] = useState<TimetableRow[]>([]);
  const [rawOcrText, setRawOcrText] = useState('');
  const [generatedSessions, setGeneratedSessions] = useState<GeneratedSession[]>([]);
  const [summary, setSummary] = useState<GenerateSummary | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<PlannerPreferences>({
    sessionLength: 60,
    preferredStart: '08:00',
    preferredEnd: '21:00',
    intensity: 'balanced',
  });

  const days = [...weekDays];
  const visibleSchedule = generatedSessions.length > 0 ? generatedSessions : fallbackSchedule[selectedDay] ?? [];
  const selectedSchedule = visibleSchedule.filter((session) => session.dayOfWeek === selectedDay);
  const plannedHours = summary?.plannedHours ?? Math.round((generatedSessions.reduce((sum, session) => sum + session.durationMinutes, 0) / 60) * 10) / 10;

  const subjectDistribution = useMemo(() => {
    const totals = new Map<string, number>();

    for (const session of generatedSessions) {
      totals.set(session.subject, (totals.get(session.subject) ?? 0) + session.durationMinutes);
    }

    return Array.from(totals.entries()).map(([subject, minutes]) => ({
      subject,
      hours: Math.round((minutes / 60) * 10) / 10,
    }));
  }, [generatedSessions]);

  const handleExtractTimetable = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');
    setRawOcrText('');

    if (!timetableImage) {
      setErrorMessage('Upload a timetable image first.');
      return;
    }

    if (timetableImage.size > 6 * 1024 * 1024) {
      setErrorMessage('This image is too large for local OCR. Upload a screenshot under 6MB.');
      return;
    }

    const formData = new FormData();
    formData.append('image', timetableImage);
    setIsExtracting(true);
    setStatusMessage('Reading timetable image. This can take up to 45 seconds for large photos.');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 60_000);

    try {
      const response = await fetch('/api/timetable/extract', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      const data = (await response.json().catch(() => null)) as { rows?: TimetableRow[]; rawText?: string; message?: string } | null;

      if (!response.ok || !data?.rows) {
        setErrorMessage(data?.message ?? 'Could not extract the timetable image.');
        setStatusMessage('');
        return;
      }

      setExtractedRows(data.rows);
      setRawOcrText(data.rawText ?? '');
      setGeneratedSessions([]);
      setSummary(null);
      setStatusMessage(data.message ?? 'Timetable rows extracted. Review them before generating your plan.');
    } catch (error) {
      setStatusMessage('');
      setErrorMessage(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'Extraction timed out. Try a smaller, clearer screenshot or add classes manually.'
          : 'Could not extract the timetable image.',
      );
    } finally {
      window.clearTimeout(timeout);
      setIsExtracting(false);
    }
  };

  const handleGeneratePlan = async () => {
    setErrorMessage('');
    setStatusMessage('');
    setIsGenerating(true);

    const response = await fetch('/api/study-plan/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rows: extractedRows,
        preferences,
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      sessions?: GeneratedSession[];
      summary?: GenerateSummary;
      message?: string;
    } | null;
    setIsGenerating(false);

    if (!response.ok || !data?.sessions) {
      setErrorMessage(data?.message ?? 'Could not generate a study plan.');
      return;
    }

    setGeneratedSessions(data.sessions);
    setSummary(data.summary ?? null);
    setSelectedDay(data.sessions[0]?.dayOfWeek ?? 'Monday');
    setStatusMessage('Personal study timetable generated from your confirmed class rows.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2">AI Study Planner</h2>
          <p className="text-muted-foreground">Upload your school timetable, review the extracted classes, then generate a personal study week.</p>
        </div>
        <div className="relative flex gap-2">
          <button
            type="button"
            onClick={handleGeneratePlan}
            disabled={extractedRows.length === 0 || isGenerating}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate Plan'}
          </button>
          <button
            type="button"
            onClick={() => setShowSettingsMenu((current) => !current)}
            className="px-4 py-2 border border-border rounded-lg inline-flex items-center gap-2 hover:bg-accent transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
            {showSettingsMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showSettingsMenu ? (
            <div className="absolute right-0 top-full mt-3 w-[320px] rounded-3xl border border-border bg-card p-4 shadow-xl shadow-slate-900/10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Planner Settings</p>
                  <p className="text-xs text-muted-foreground">Theme and account preferences</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-full bg-blue-600 px-3 py-1 text-white text-xs"
                >
                  {theme === 'dark' ? 'Light' : 'Dark'} mode
                </button>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-muted p-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Account</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Manage your profile, passwords, and preferences.</p>
                  <Link href="/profile" className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500 transition-colors">
                    <Lock className="w-4 h-4" />
                    Open Profile
                  </Link>
                </div>
                <div className="rounded-2xl border border-border bg-muted p-3">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">AI Help</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Use the dedicated AI chat page for planning assistance.</p>
                  <Link href="/ai-chat" className="mt-3 inline-flex items-center gap-2 rounded-full bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-500 transition-colors">
                    Chat with AI
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ImageUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Upload School Timetable</h3>
          </div>
          <form onSubmit={handleExtractTimetable} className="space-y-4">
            <label className="flex flex-col gap-2 rounded-3xl border border-border bg-slate-50 px-4 py-4 text-sm text-neutral-700">
              <span className="font-medium">Timetable image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setTimetableImage(event.target.files?.[0] ?? null)}
                className="cursor-pointer text-sm text-neutral-700 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
              />
              {timetableImage ? (
                <p className="text-sm text-neutral-500">Selected file: {timetableImage.name}</p>
              ) : (
                <p className="text-sm text-neutral-500">Upload a clear photo or screenshot of your school timetable.</p>
              )}
            </label>
            <button
              type="submit"
              disabled={isExtracting}
              className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-xl transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              {isExtracting ? 'Extracting...' : 'Extract timetable'}
            </button>
          </form>

          {statusMessage ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {statusMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}
        </section>

        <section className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Study Preferences</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium">Session length</span>
              <select
                value={preferences.sessionLength}
                onChange={(event) => setPreferences((current) => ({ ...current, sessionLength: Number(event.target.value) }))}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium">Intensity</span>
              <select
                value={preferences.intensity}
                onChange={(event) => setPreferences((current) => ({ ...current, intensity: event.target.value as PlannerPreferences['intensity'] }))}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              >
                <option value="light">Light</option>
                <option value="balanced">Balanced</option>
                <option value="intense">Intense</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium">Earliest study time</span>
              <input
                type="time"
                value={preferences.preferredStart}
                onChange={(event) => setPreferences((current) => ({ ...current, preferredStart: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium">Latest study time</span>
              <input
                type="time"
                value={preferences.preferredEnd}
                onChange={(event) => setPreferences((current) => ({ ...current, preferredEnd: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3"
              />
            </label>
          </div>
        </section>
      </div>

      <section className="mt-6 bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold">Review Extracted Classes</h3>
            <p className="text-sm text-muted-foreground">Correct the draft rows before generating your personal study timetable.</p>
          </div>
          <button
            type="button"
            onClick={() => setExtractedRows((current) => [...current, emptyRow()])}
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            <Plus className="w-4 h-4" />
            Add class
          </button>
        </div>

        {extractedRows.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-muted/60 p-6 text-sm text-muted-foreground">
            Upload a timetable image to start, or add class rows manually.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 pr-3 font-medium">Course code</th>
                  <th className="py-3 pr-3 font-medium">Course name</th>
                  <th className="py-3 pr-3 font-medium">Day</th>
                  <th className="py-3 pr-3 font-medium">Start</th>
                  <th className="py-3 pr-3 font-medium">End</th>
                  <th className="py-3 pr-3 font-medium">Venue</th>
                  <th className="py-3 pr-3 font-medium">Confidence</th>
                  <th className="py-3 font-medium">Remove</th>
                </tr>
              </thead>
              <tbody>
                {extractedRows.map((row) => (
                  <tr key={row.id} className="border-b border-border">
                    <td className="py-3 pr-3">
                      <input
                        value={row.courseCode}
                        onChange={(event) => setExtractedRows((current) => updateRow(current, row.id, 'courseCode', event.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2"
                      />
                    </td>
                    <td className="py-3 pr-3">
                      <input
                        value={row.courseName}
                        onChange={(event) => setExtractedRows((current) => updateRow(current, row.id, 'courseName', event.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2"
                      />
                    </td>
                    <td className="py-3 pr-3">
                      <select
                        value={row.dayOfWeek}
                        onChange={(event) => setExtractedRows((current) => updateRow(current, row.id, 'dayOfWeek', event.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2"
                      >
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 pr-3">
                      <input
                        type="time"
                        value={row.startTime}
                        onChange={(event) => setExtractedRows((current) => updateRow(current, row.id, 'startTime', event.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2"
                      />
                    </td>
                    <td className="py-3 pr-3">
                      <input
                        type="time"
                        value={row.endTime}
                        onChange={(event) => setExtractedRows((current) => updateRow(current, row.id, 'endTime', event.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2"
                      />
                    </td>
                    <td className="py-3 pr-3">
                      <input
                        value={row.venue}
                        onChange={(event) => setExtractedRows((current) => updateRow(current, row.id, 'venue', event.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2"
                      />
                    </td>
                    <td className="py-3 pr-3">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs">{Math.round(row.confidence * 100)}%</span>
                    </td>
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => setExtractedRows((current) => current.filter((item) => item.id !== row.id))}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-accent"
                        aria-label="Remove class row"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {rawOcrText ? (
        <section className="mt-6 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Raw OCR Text</h3>
          <pre className="max-h-52 overflow-auto whitespace-pre-wrap rounded-3xl border border-border bg-muted p-4 text-xs text-muted-foreground">
            {rawOcrText}
          </pre>
        </section>
      ) : null}

      <section className="mt-6 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">{generatedSessions.length > 0 ? 'Generated Study Timetable' : 'Sample Study Timetable'}</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
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
      </section>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{selectedDay}&apos;s Schedule</h3>
              <button
                type="button"
                onClick={() => setExtractedRows((current) => [...current, emptyRow()])}
                className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-4 h-4" />
                Add Class
              </button>
            </div>
            <div className="space-y-4">
              {selectedSchedule.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border bg-muted/60 p-6 text-sm text-muted-foreground">
                  No sessions scheduled for this day yet.
                </div>
              ) : (
                selectedSchedule.map((session) => (
                  <div
                    key={session.id}
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
                        <div className="text-muted-foreground text-sm mt-1 min-w-[120px]">
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">{session.subject}</div>
                          <div className="text-sm text-muted-foreground mb-2">{session.task}</div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{session.durationMinutes} minutes</span>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{session.reason}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Plan Statistics</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Confirmed classes</span>
                <span className="font-medium">{summary?.classCount ?? extractedRows.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Courses planned</span>
                <span className="font-medium">{summary?.courseCount ?? subjectDistribution.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Weekly study hours</span>
                <span className="font-medium">{plannedHours}h</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 mt-1" />
              <div>
                <h3 className="text-white mb-2 font-semibold">Planner Logic</h3>
                <p className="text-white/90 text-sm">
                  Study sessions avoid class blocks, add recovery time after lectures, and distribute work by course.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGeneratePlan}
              disabled={extractedRows.length === 0 || isGenerating}
              className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors font-medium disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isGenerating ? 'Generating...' : 'Regenerate Plan'}
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
            <div className="space-y-3">
              {subjectDistribution.length === 0 ? (
                <p className="text-sm text-muted-foreground">Generate a plan to see study time by subject.</p>
              ) : (
                subjectDistribution.map((item) => (
                  <div key={item.subject}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{item.subject}</span>
                      <span className="text-sm text-muted-foreground">{item.hours}h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                        style={{ width: `${Math.min((item.hours / Math.max(plannedHours, 1)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
