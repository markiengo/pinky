import { NextRequest, NextResponse } from "next/server";
import {
  updateStudySession,
  deleteStudySessionWithSuggestion,
  requireCalendarAccess,
} from "@/lib/calendar";
import { prisma } from "@/lib/db";

export async function PUT(req: NextRequest) {
  const access = await requireCalendarAccess();
  if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (access.plan !== "premium") {
    return NextResponse.json({ error: "Premium only." }, { status: 403 });
  }

  const body = await req.json();
  const { sessions } = body as {
    sessions: { id: string; startTime: string; endTime: string; status: string; description?: string | null; title?: string }[];
  };

  if (!sessions || !Array.isArray(sessions)) {
    return NextResponse.json({ error: "Thiếu sessions." }, { status: 400 });
  }

  const plan = await prisma.studyPlan.findUnique({
    where: { userId: access.userId },
    select: { id: true },
  });
  if (!plan) {
    return NextResponse.json({ error: "Không tìm thấy kế hoạch." }, { status: 404 });
  }

  for (const s of sessions) {
    const existing = await prisma.studySession.findFirst({
      where: { id: s.id, planId: plan.id },
      select: { id: true },
    });
    if (!existing) continue;

    await prisma.studySession.update({
      where: { id: s.id },
      data: {
        startTime: new Date(s.startTime),
        endTime: new Date(s.endTime),
        status: s.status,
        ...(s.description !== undefined ? { description: s.description } : {}),
        ...(s.title !== undefined ? { title: s.title } : {}),
      },
    });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const access = await requireCalendarAccess();
  if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (access.plan !== "premium") {
    return NextResponse.json({ error: "Premium only." }, { status: 403 });
  }

  const body = await req.json();
  const { sessionId, startTime, endTime, status } = body as {
    sessionId: string;
    startTime?: string;
    endTime?: string;
    status?: "planned" | "done" | "skipped";
  };

  if (!sessionId) {
    return NextResponse.json({ error: "Thiếu sessionId." }, { status: 400 });
  }

  const result = await updateStudySession(sessionId, { startTime, endTime, status });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const access = await requireCalendarAccess();
  if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (access.plan !== "premium") {
    return NextResponse.json({ error: "Premium only." }, { status: 403 });
  }

  const body = await req.json();
  const { sessionId } = body as { sessionId: string };

  if (!sessionId) {
    return NextResponse.json({ error: "Thiếu sessionId." }, { status: 400 });
  }

  const result = await deleteStudySessionWithSuggestion(sessionId);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    suggestion: result.suggestion
      ? {
          date: result.suggestion.date,
          startTime: result.suggestion.startTime,
          endTime: result.suggestion.endTime,
          reason: result.suggestion.reason,
        }
      : undefined,
  });
}
