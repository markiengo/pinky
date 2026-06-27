import { NextRequest, NextResponse } from "next/server";
import { createStudyPlan, getStudyPlan, requireCalendarAccess } from "@/lib/calendar";

export async function GET() {
  const access = await requireCalendarAccess();
  if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const plan = await getStudyPlan();
  if (!plan) return NextResponse.json({ plan: null });

  return NextResponse.json({
    plan: {
      planId: plan.planId,
      subjects: plan.subjects.map((s) => ({
        ...s,
        examDate: new Date(s.examDate).toISOString(),
        sessions: s.sessions.map((session) => ({
          ...session,
          startTime: new Date(session.startTime).toISOString(),
          endTime: new Date(session.endTime).toISOString(),
        })),
      })),
    },
  });
}

export async function POST(req: NextRequest) {
  const access = await requireCalendarAccess();
  if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (access.plan !== "premium") {
    return NextResponse.json({ error: "Premium only." }, { status: 403 });
  }

  const body = await req.json();
  const { subjects } = body as {
    subjects: { name: string; examDate: string; dailyHours: number }[];
  };

  if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return NextResponse.json({ error: "Thiếu môn học." }, { status: 400 });
  }

  const result = await createStudyPlan(subjects);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  const plan = await getStudyPlan();
  return NextResponse.json({
    success: true,
    plan: plan
      ? {
          planId: plan.planId,
          subjects: plan.subjects.map((s) => ({
            ...s,
            examDate: new Date(s.examDate).toISOString(),
            sessions: s.sessions.map((session) => ({
              ...session,
              startTime: new Date(session.startTime).toISOString(),
              endTime: new Date(session.endTime).toISOString(),
            })),
          })),
        }
      : null,
  });
}
