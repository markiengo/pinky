import { AppShell } from "@/components/app-shell";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getStudyPlan, getCurrentUserPlan } from "@/lib/calendar";
import { CalendarClient } from "@/components/calendar/calendar-client";

function serializePlan(plan: Awaited<ReturnType<typeof getStudyPlan>>) {
  if (!plan) return null;
  return {
    planId: plan.planId,
    subjects: plan.subjects.map((s) => ({
      id: s.id,
      name: s.name,
      examDate: new Date(s.examDate).toISOString(),
      dailyHours: s.dailyHours,
      totalHours: s.totalHours,
      color: s.color,
      sessions: s.sessions.map((session) => ({
        id: session.id,
        subjectId: session.subjectId,
        title: session.title,
        startTime: new Date(session.startTime).toISOString(),
        endTime: new Date(session.endTime).toISOString(),
        status: session.status as "planned" | "done" | "skipped",
        deThiId: session.deThiId,
        description: session.description,
        subject: {
          id: session.subject.id,
          name: session.subject.name,
          color: session.subject.color,
        },
      })),
    })),
  };
}

export default async function CalendarPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getCurrentUserPlan();
  if (!user) redirect("/login");

  const isPremium = user.plan === "premium";
  const plan = isPremium ? serializePlan(await getStudyPlan()) : null;

  return (
    <AppShell username={user.username}>
      <CalendarClient
        isPremium={isPremium}
        initialPlan={plan}
        username={user.username}
      />
    </AppShell>
  );
}
