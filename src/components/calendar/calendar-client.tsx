"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
  Trash2,
  X,
  Clock,
  BookOpen,
  AlertCircle,
  Crown,
  ArrowRight,
  Save,
  Calendar,
  Menu,
} from "lucide-react";
import Link from "next/link";

interface StudySession {
  id: string;
  subjectId: string;
  title: string;
  startTime: string;
  endTime: string;
  status: "planned" | "done" | "skipped";
  deThiId: string | null;
  description: string | null;
  subject: {
    id: string;
    name: string;
    color: string;
  };
}

interface StudySubjectWithSessions {
  id: string;
  name: string;
  examDate: string;
  dailyHours: number;
  totalHours: number;
  color: string;
  sessions: StudySession[];
}

interface CalendarPlan {
  planId: string;
  subjects: StudySubjectWithSessions[];
}

interface AlternativeSlot {
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

interface CalendarClientProps {
  isPremium: boolean;
  initialPlan: CalendarPlan | null;
  username: string;
}

const WEEKDAYS_MON = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTHS_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
  "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
  "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];
const HOUR_HEIGHT = 48;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const EVENT_COLORS = ["#9F7AEA", "#4ECDC4", "#F4899A", "#FFD93D", "#A8E6CF", "#B0B0B0"];

function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function formatTime(date: Date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function formatDateVi(date: Date) {
  return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CalendarClient({ isPremium, initialPlan, username }: CalendarClientProps) {
  const [plan, setPlan] = useState<CalendarPlan | null>(initialPlan);
  const [savedPlan, setSavedPlan] = useState<CalendarPlan | null>(initialPlan);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("week");
  const [showWizard, setShowWizard] = useState(!initialPlan);
  const [selectedSession, setSelectedSession] = useState<StudySession | null>(null);
  const [suggestion, setSuggestion] = useState<AlternativeSlot | null>(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragConfirm, setDragConfirm] = useState<{ sessionId: string; newDate: Date; newHour: number } | null>(null);
  const dragSessionRef = useRef<StudySession | null>(null);
  const [eventModal, setEventModal] = useState<{
    session: StudySession | null;
    date: Date | null;
    hour: number | null;
  } | null>(null);

  const allSessions = useMemo(() => {
    if (!plan) return [];
    return plan.subjects.flatMap((s) => s.sessions);
  }, [plan]);

  const sessionsByDay = useMemo(() => {
    const map = new Map<string, StudySession[]>();
    for (const session of allSessions) {
      const d = new Date(session.startTime);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const arr = map.get(key) || [];
      arr.push(session);
      map.set(key, arr);
    }
    return map;
  }, [allSessions]);

  const getSessionsForDay = useCallback(
    (date: Date) => {
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      return (sessionsByDay.get(key) || []).sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
    },
    [sessionsByDay]
  );

  const navigateMonth = (delta: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + delta);
      return next;
    });
  };

  const navigateWeek = (delta: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + delta * 7);
      return next;
    });
  };

  const goToday = () => setCurrentDate(new Date());

  const handleDeleteSession = (sessionId: string) => {
    setPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        subjects: prev.subjects.map((s) => ({
          ...s,
          sessions: s.sessions.filter((sess) => sess.id !== sessionId),
        })),
      };
    });
    setSelectedSession(null);
    setEventModal(null);
    setHasUnsavedChanges(true);
  };

  const handleSaveEvent = (updated: {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    color: string;
  }) => {
    setPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        subjects: prev.subjects.map((s) => ({
          ...s,
          sessions: s.sessions.map((sess) =>
            sess.id === updated.id
              ? {
                  ...sess,
                  title: updated.title,
                  startTime: updated.startTime,
                  endTime: updated.endTime,
                  description: updated.description,
                  subject: { ...sess.subject, color: updated.color },
                }
              : sess
          ),
        })),
      };
    });
    setHasUnsavedChanges(true);
    setEventModal(null);
  };

  const handleDragDrop = (sessionId: string, newDate: Date, newHour: number) => {
    setDragConfirm({ sessionId, newDate, newHour });
  };

  const confirmMove = () => {
    if (!dragConfirm) return;
    const { sessionId, newDate, newHour } = dragConfirm;
    const session = allSessions.find((s) => s.id === sessionId);
    if (!session) { setDragConfirm(null); return; }
    const duration = new Date(session.endTime).getTime() - new Date(session.startTime).getTime();
    const newStart = new Date(newDate);
    newStart.setHours(newHour, 0, 0, 0);
    const newEnd = new Date(newStart.getTime() + duration);

    setPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        subjects: prev.subjects.map((s) => ({
          ...s,
          sessions: s.sessions.map((sess) =>
            sess.id === sessionId
              ? { ...sess, startTime: newStart.toISOString(), endTime: newEnd.toISOString() }
              : sess
          ),
        })),
      };
    });
    setHasUnsavedChanges(true);
    setDragConfirm(null);
  };

  const handleSavePlan = async () => {
    if (!plan) return;
    setSaving(true);
    setError(null);
    try {
      const allSessions = plan.subjects.flatMap((s) =>
        s.sessions.map((sess) => ({
          id: sess.id,
          startTime: sess.startTime,
          endTime: sess.endTime,
          status: sess.status,
          description: sess.description,
          title: sess.title,
        }))
      );
      const res = await fetch("/api/calendar/session", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessions: allSessions }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedPlan(plan);
        setHasUnsavedChanges(false);
        setShowSaveConfirm(false);
      } else {
        setError(data.error || "Không thể lưu.");
      }
    } catch {
      setError("Không thể kết nối đến server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setPlan(savedPlan);
    setHasUnsavedChanges(false);
    setShowDiscardConfirm(false);
  };

  // Premium gate
  if (!isPremium) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Lịch ôn thi — Tính năng Premium</h1>
            <p className="text-muted-foreground">
              Nâng cấp lên gói Premium để tạo lịch ôn thi thông minh, theo dõi tiến độ học tập và nhận gợi ý đề thi phù hợp.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition"
          >
            Nâng cấp Premium <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Show wizard if no plan (first-time setup)
  if (!plan && !suggestion) {
    return (
      <SetupWizard
        onComplete={(newPlan) => {
          setPlan(newPlan);
          setSavedPlan(newPlan);
          setHasUnsavedChanges(false);
          setShowWizard(false);
        }}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  // Show wizard when editing existing plan
  if (showWizard && plan) {
    return (
      <SetupWizard
        existingPlan={plan}
        onComplete={(newPlan) => {
          setPlan(newPlan);
          setSavedPlan(newPlan);
          setHasUnsavedChanges(false);
          setShowWizard(false);
        }}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => (viewMode === "month" ? navigateMonth(-1) : navigateWeek(-1))}
            className="p-1.5 rounded-lg hover:bg-muted transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => (viewMode === "month" ? navigateMonth(1) : navigateWeek(1))}
            className="p-1.5 rounded-lg hover:bg-muted transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold min-w-[140px]">
            {MONTHS_VI[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
        </div>
        <button
          onClick={goToday}
          className="px-3 py-1.5 text-sm rounded-lg border hover:bg-muted transition"
        >
          Hôm nay
        </button>
        <div className="flex rounded-lg border overflow-hidden">
          <button
            onClick={() => setViewMode("month")}
            className={`px-3 py-1.5 text-sm transition ${
              viewMode === "month" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            Tháng
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`px-3 py-1.5 text-sm transition ${
              viewMode === "week" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            Tuần
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {plan && plan.subjects.length > 0 && (
            <div className="hidden sm:flex items-center gap-3">
              {plan.subjects.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => hasUnsavedChanges ? setShowDiscardConfirm(true) : setShowWizard(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border hover:bg-muted transition"
          >
            <Plus className="w-4 h-4" /> Sửa kế hoạch
          </button>
          <button
            onClick={() => setEventModal({ session: null, date: new Date(), hour: 9 })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border hover:bg-muted transition"
          >
            <Plus className="w-4 h-4" /> Thêm sự kiện
          </button>
          <button
            onClick={() => setShowSaveConfirm(true)}
            disabled={!hasUnsavedChanges}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition ${
              hasUnsavedChanges
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border text-muted-foreground cursor-default"
            }`}
          >
            <Save className="w-4 h-4" /> Lưu lịch
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-3 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Unsaved changes banner */}
      {hasUnsavedChanges && (
        <div className="mx-4 mt-3 p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Bạn có thay đổi chưa lưu.
          <button onClick={() => setShowSaveConfirm(true)} className="ml-auto font-medium underline">Lưu ngay</button>
          <button onClick={() => setShowDiscardConfirm(true)} className="font-medium underline">Hủy bỏ</button>
        </div>
      )}

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto p-4">
        {viewMode === "month" ? (
          <MonthView
            currentDate={currentDate}
            getSessionsForDay={getSessionsForDay}
            onSelectSession={(s) => setEventModal({ session: s, date: null, hour: null })}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            getSessionsForDay={getSessionsForDay}
            onSelectSession={(s) => setEventModal({ session: s, date: null, hour: null })}
            onDragDrop={handleDragDrop}
            dragSessionRef={dragSessionRef}
            onSlotClick={(date, hour) => setEventModal({ session: null, date, hour })}
          />
        )}
      </div>

      {/* Event edit modal */}
      {eventModal && (
        <EventEditModal
          session={eventModal.session}
          slotDate={eventModal.date}
          slotHour={eventModal.hour}
          onClose={() => setEventModal(null)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteSession}
        />
      )}

      {/* Save confirmation modal */}
      {showSaveConfirm && (
        <ConfirmModal
          title="Lưu lịch ôn thi"
          message="Bạn có chắc muốn lưu các thay đổi? Hành động này sẽ cập nhật database."
          confirmLabel={saving ? "Đang lưu..." : "Lưu"}
          onConfirm={handleSavePlan}
          onCancel={() => setShowSaveConfirm(false)}
          confirmDisabled={saving}
        />
      )}

      {/* Discard confirmation modal */}
      {showDiscardConfirm && (
        <ConfirmModal
          title="Hủy bỏ thay đổi"
          message="Tất cả thay đổi chưa lưu sẽ bị mất. Bạn có chắc?"
          confirmLabel="Hủy bỏ"
          onConfirm={handleDiscardChanges}
          onCancel={() => setShowDiscardConfirm(false)}
        />
      )}

      {/* Drag move confirmation modal */}
      {dragConfirm && (
        <ConfirmModal
          title="Di chuyển buổi học"
          message={`Chuyển sang ${formatDateVi(dragConfirm.newDate)} lúc ${pad2(dragConfirm.newHour)}:00? Nhấn xác nhận để áp dụng.`}
          confirmLabel="Xác nhận"
          onConfirm={confirmMove}
          onCancel={() => setDragConfirm(null)}
        />
      )}

      {/* Suggestion modal */}
      {suggestion && (
        <SuggestionModal
          suggestion={suggestion}
          onClose={() => setSuggestion(null)}
        />
      )}

    </div>
  );
}

// ─── Month View (Monday-start) ───────────────────────────────────
function MonthView({
  currentDate,
  getSessionsForDay,
  onSelectSession,
}: {
  currentDate: Date;
  getSessionsForDay: (d: Date) => StudySession[];
  onSelectSession: (s: StudySession) => void;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  // Convert Sunday=0 to Monday=0 offset: Sun=6, Mon=0, Tue=1, ...
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="grid grid-cols-7 border-b bg-muted/50">
        {WEEKDAYS_MON.map((day) => (
          <div key={day} className="px-2 py-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="min-h-[100px] border-r border-b bg-muted/20" />;
          const sessions = getSessionsForDay(date);
          const isToday = isSameDay(date, today);
          return (
            <div
              key={i}
              className={`min-h-[100px] border-r border-b p-1.5 overflow-hidden ${
                isToday ? "bg-primary/5" : ""
              }`}
            >
              <div className={`text-xs mb-1 ${isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {sessions.slice(0, 3).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectSession(s)}
                    className="w-full text-left px-1.5 py-1 rounded text-xs truncate hover:opacity-80 transition"
                    style={{
                      backgroundColor: `${s.subject.color}30`,
                      borderLeft: `3px solid ${s.subject.color}`,
                    }}
                  >
                    <span className="font-medium">{formatTime(new Date(s.startTime))}</span>{" "}
                    {s.title}
                  </button>
                ))}
                {sessions.length > 3 && (
                  <div className="text-xs text-muted-foreground px-1.5">
                    +{sessions.length - 3} nữa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week View (Mon-Sun, 24h time grid) ─────────────────────────
function WeekView({
  currentDate,
  getSessionsForDay,
  onSelectSession,
  onDragDrop,
  dragSessionRef,
  onSlotClick,
}: {
  currentDate: Date;
  getSessionsForDay: (d: Date) => StudySession[];
  onSelectSession: (s: StudySession) => void;
  onDragDrop: (sessionId: string, newDate: Date, newHour: number) => void;
  dragSessionRef: React.RefObject<StudySession | null>;
  onSlotClick: (date: Date, hour: number) => void;
}) {
  // Monday-start week
  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    const offset = day === 0 ? -6 : 1 - day; // Mon=0, ..., Sun=6
    d.setDate(d.getDate() + offset);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const today = new Date();
  const gridHeight = 24 * HOUR_HEIGHT;

  return (
    <div className="rounded-xl border overflow-hidden">
      {/* Day headers */}
      <div className="flex border-b bg-muted/50">
        <div className="w-14 flex-shrink-0" />
        {weekDays.map((day, i) => (
          <div key={i} className="flex-1 px-2 py-2 text-center">
            <div className="text-xs text-muted-foreground">{WEEKDAYS_MON[i]}</div>
            <div className={`text-sm font-medium ${isSameDay(day, today) ? "text-primary" : ""}`}>
              {day.getDate()}/{day.getMonth() + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex overflow-auto" style={{ maxHeight: "70vh" }}>
        {/* Hour labels column */}
        <div className="w-14 flex-shrink-0 border-r relative" style={{ height: gridHeight }}>
          {HOURS.map((h) => (
            <div
              key={h}
              className="text-[10px] text-muted-foreground text-right pr-1.5 border-b"
              style={{ height: HOUR_HEIGHT }}
            >
              <span style={{ position: "relative", top: -6 }}>{pad2(h)}:00</span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIdx) => {
          const sessions = getSessionsForDay(day);
          const isToday = isSameDay(day, today);
          return (
            <div
              key={dayIdx}
              className={`flex-1 border-r relative ${isToday ? "bg-primary/5" : ""}`}
              style={{ height: gridHeight }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const hour = Math.floor(y / HOUR_HEIGHT);
                const dragged = dragSessionRef.current;
                if (dragged) {
                  onDragDrop(dragged.id, day, hour);
                  dragSessionRef.current = null;
                }
              }}
              onClick={(e) => {
                // Only trigger if clicking empty area (not a session block)
                if (e.target === e.currentTarget) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = e.clientY - rect.top;
                  const hour = Math.floor(y / HOUR_HEIGHT);
                  onSlotClick(day, hour);
                }
              }}
            >
              {/* Hour grid lines */}
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="border-b"
                  style={{ height: HOUR_HEIGHT }}
                />
              ))}

              {/* Session blocks */}
              {sessions.map((s) => {
                const start = new Date(s.startTime);
                const end = new Date(s.endTime);
                const topOffset = (start.getHours() * 60 + start.getMinutes()) * (HOUR_HEIGHT / 60);
                const blockHeight = ((end.getTime() - start.getTime()) / (1000 * 60)) * (HOUR_HEIGHT / 60);
                return (
                  <div
                    key={s.id}
                    draggable
                    onDragStart={() => { dragSessionRef.current = s; }}
                    onClick={(e) => { e.stopPropagation(); onSelectSession(s); }}
                    className="absolute left-0.5 right-0.5 rounded-lg text-[11px] cursor-grab active:cursor-grabbing hover:opacity-80 transition overflow-hidden px-1.5 py-1"
                    style={{
                      top: topOffset,
                      height: Math.max(blockHeight, 20),
                      backgroundColor: `${s.subject.color}25`,
                      borderLeft: `3px solid ${s.subject.color}`,
                    }}
                  >
                    <div className="font-medium truncate">{s.title}</div>
                    <div className="flex items-center gap-0.5 text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTime(start)}-{formatTime(end)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Event Edit Modal (Google Calendar-style) ───────────────────
function EventEditModal({
  session,
  slotDate,
  slotHour,
  onClose,
  onSave,
  onDelete,
}: {
  session: StudySession | null;
  slotDate: Date | null;
  slotHour: number | null;
  onClose: () => void;
  onSave: (updated: { id: string; title: string; startTime: string; endTime: string; description: string; color: string }) => void;
  onDelete: (sessionId: string) => void;
}) {
  const isEditing = !!session;
  const existingStart = session ? new Date(session.startTime) : null;
  const existingEnd = session ? new Date(session.endTime) : null;
  const baseDate = slotDate || existingStart || new Date();
  const baseHour = slotHour ?? existingStart?.getHours() ?? 9;

  const [title, setTitle] = useState(session?.title || "");
  const [date, setDate] = useState(() => {
    const d = new Date(baseDate);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [startHour, setStartHour] = useState(baseHour);
  const [startMin, setStartMin] = useState(existingStart?.getMinutes() ?? 0);
  const [endHour, setEndHour] = useState(() => {
    if (existingEnd) return existingEnd.getHours();
    return baseHour + 1;
  });
  const [endMin, setEndMin] = useState(existingEnd?.getMinutes() ?? 0);
  const [description, setDescription] = useState(session?.description || "");
  const [color, setColor] = useState(session?.subject.color || EVENT_COLORS[0]);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!session) return;
    const newStart = new Date(date);
    newStart.setHours(startHour, startMin, 0, 0);
    const newEnd = new Date(date);
    newEnd.setHours(endHour, endMin, 0, 0);
    onSave({
      id: session.id,
      title: title.trim() || session.title,
      startTime: newStart.toISOString(),
      endTime: newEnd.toISOString(),
      description,
      color,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-background rounded-2xl border shadow-xl max-w-md w-full p-6 space-y-4"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">{isEditing ? "Edit Schedule" : "Add Schedule"}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title input */}
        <input
          ref={titleRef}
          type="text"
          placeholder="New event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />

        {/* Date row */}
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="date"
            value={`${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split("-").map(Number);
              if (y && m && d) setDate(new Date(y, m - 1, d));
            }}
            className="flex-1 px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>

        {/* Time row */}
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 flex items-center gap-2">
            <TimeInput hour={startHour} minute={startMin} onChange={(h, m) => { setStartHour(h); setStartMin(m); }} />
            <span className="text-muted-foreground text-xs">→</span>
            <TimeInput hour={endHour} minute={endMin} onChange={(h, m) => { setEndHour(h); setEndMin(m); }} />
          </div>
        </div>

        {/* Description row */}
        <div className="flex items-start gap-3">
          <Menu className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-2.5" />
          <textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="flex-1 px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
          />
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-2 pl-7">
          {EVENT_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-6 h-6 rounded-full transition-all"
              style={{
                backgroundColor: c,
                border: color === c ? "2px solid var(--foreground)" : "2px solid transparent",
                transform: color === c ? "scale(1.15)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          {isEditing ? (
            <button
              onClick={() => onDelete(session!.id)}
              className="px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Xóa
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Time Input Helper ────────────────────────────────────────────
function TimeInput({ hour, minute, onChange }: { hour: number; minute: number; onChange: (h: number, m: number) => void }) {
  const clampHour = (v: number) => Math.min(23, Math.max(0, v));
  const clampMin = (v: number) => Math.min(59, Math.max(0, v));

  return (
    <div className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-xl border bg-background text-sm">
      <input
        type="text"
        inputMode="numeric"
        value={pad2(hour)}
        onChange={(e) => {
          const v = parseInt(e.target.value.replace(/\D/g, "")) || 0;
          onChange(clampHour(v), minute);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") { e.preventDefault(); onChange(clampHour(hour + 1), minute); }
          if (e.key === "ArrowDown") { e.preventDefault(); onChange(clampHour(hour - 1), minute); }
        }}
        className="w-10 text-center bg-transparent focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="text-muted-foreground">:</span>
      <input
        type="text"
        inputMode="numeric"
        value={pad2(minute)}
        onChange={(e) => {
          const v = parseInt(e.target.value.replace(/\D/g, "")) || 0;
          onChange(hour, clampMin(v));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") { e.preventDefault(); onChange(hour, clampMin(minute + 5)); }
          if (e.key === "ArrowDown") { e.preventDefault(); onChange(hour, clampMin(minute - 5)); }
        }}
        className="w-10 text-center bg-transparent focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
}

// ─── Suggestion Modal ─────────────────────────────────────────────
function SuggestionModal({
  suggestion,
  onClose,
}: {
  suggestion: AlternativeSlot;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-background rounded-xl border shadow-lg max-w-sm w-full p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold">Gợi ý dời lịch</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
        <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <span>{formatDateVi(new Date(suggestion.date))}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>
              {formatTime(new Date(suggestion.startTime))} - {formatTime(new Date(suggestion.endTime))}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
}

// ─── Confirm Modal ───────────────────────────────────────────────
function ConfirmModal({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  confirmDisabled,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onCancel}>
      <div
        className="bg-background rounded-xl border shadow-lg max-w-sm w-full p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-muted transition"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Setup Wizard ─────────────────────────────────────────────────
function SetupWizard({
  existingPlan,
  onComplete,
  onCancel,
}: {
  existingPlan?: CalendarPlan;
  onComplete: (plan: CalendarPlan) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(0);
  const [subjects, setSubjects] = useState(
    existingPlan
      ? existingPlan.subjects.map((s) => ({
          name: s.name,
          examDate: s.examDate.split("T")[0],
          dailyHours: String(s.dailyHours),
        }))
      : [{ name: "", examDate: "", dailyHours: "2" }]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", examDate: "", dailyHours: "2" }]);
  };

  const removeSubject = (idx: number) => {
    setSubjects(subjects.filter((_, i) => i !== idx));
  };

  const updateSubject = (idx: number, field: string, value: string) => {
    setSubjects(subjects.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/calendar/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjects: subjects.map((s) => ({
            name: s.name.trim(),
            examDate: s.examDate,
            dailyHours: parseFloat(s.dailyHours) || 1,
          })),
        }),
      });
      const data = await res.json();
      if (data.success && data.plan) {
        onComplete(data.plan);
      } else {
        setError(data.error || "Có lỗi xảy ra.");
      }
    } catch {
      setError("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = subjects.every((s) => s.name.trim() && s.examDate);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6">
        {/* Back button + title */}
        <div className="flex items-center gap-3">
          {existingPlan && (
            <button
              onClick={onCancel}
              className="p-2 rounded-lg border hover:bg-muted transition flex items-center gap-1.5 text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Quay lại
            </button>
          )}
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{existingPlan ? "Chỉnh sửa kế hoạch" : "Tạo kế hoạch ôn thi"}</h1>
          <p className="text-muted-foreground text-sm">
            {existingPlan
              ? "Chỉnh sửa môn học, ngày thi và số giờ học. Thay đổi sẽ tạo lại lịch."
              : "Nhập môn học, ngày thi và số giờ học mỗi ngày. App sẽ tạo lịch ôn thi thông minh cho bạn."}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          {subjects.map((subject, idx) => (
            <div key={idx} className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {existingPlan && existingPlan.subjects[idx] && (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: existingPlan.subjects[idx]?.color || "#9F7AEA" }}
                    />
                  )}
                  <span className="text-sm font-medium">Môn #{idx + 1}</span>
                </div>
                <button
                  onClick={() => removeSubject(idx)}
                  className="p-1 rounded hover:bg-destructive/10 text-destructive transition"
                  title="Xóa môn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tên môn (vd: Kế toán, Tài chính...)"
                  value={subject.name}
                  onChange={(e) => updateSubject(idx, "name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Ngày thi</label>
                    <input
                      type="date"
                      value={subject.examDate}
                      onChange={(e) => updateSubject(idx, "examDate", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Giờ/ngày</label>
                    <input
                      type="number"
                      min="0.5"
                      max="8"
                      step="0.5"
                      value={subject.dailyHours}
                      onChange={(e) => updateSubject(idx, "dailyHours", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addSubject}
          className="w-full px-4 py-2 rounded-lg border border-dashed text-sm text-muted-foreground hover:bg-muted transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Thêm môn
        </button>

        <div className="flex gap-3">
          {existingPlan && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border text-sm hover:bg-muted transition"
            >
              Hủy
            </button>
          )}
          <button
            onClick={handleCreate}
            disabled={!canProceed || loading}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : existingPlan ? "Lưu thay đổi" : "Tạo kế hoạch"}
          </button>
        </div>
      </div>
    </div>
  );
}
