import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

interface SeedQuestion {
  type: string;
  content: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
}

interface SeedDeThi {
  title: string;
  source: string;
  tags: string[];
  questions: SeedQuestion[];
}

interface SeedFile {
  subject: { slug: string; name: string };
  deThi: SeedDeThi[];
}

function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function uniqueTags(tags: string[]): string[] {
  return Array.from(new Set(tags));
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function rand(seed: number): number {
  const x = Math.sin(seed * 9999 + 1111) * 10000;
  return x - Math.floor(x);
}

const CONCURRENCY = 5;

async function seed() {
  const t0 = Date.now();
  console.log("Seeding question bank from JSON data files...");

  // 1. Clear all data in parallel (respecting FK order)
  await Promise.all([prisma.quizAnswer.deleteMany(), prisma.quizAttempt.deleteMany()]);
  await Promise.all([prisma.deThiQuestion.deleteMany(), prisma.question.deleteMany(), prisma.deThi.deleteMany()]);
  await Promise.all([prisma.user.deleteMany(), prisma.subject.deleteMany()]);
  console.log("  cleared existing data");

  // 2. Read all JSON files
  const dataDir = join(__dirname, "data");
  const jsonFiles = readdirSync(dataDir).filter((f) => f.endsWith(".json") && !f.startsWith("BRAND"));
  const allData = jsonFiles.map((f) => JSON.parse(readFileSync(join(dataDir, f), "utf-8")) as SeedFile);
  console.log(`  found ${jsonFiles.length} JSON data files: ${jsonFiles.join(", ")}`);

  // 3. Create all subjects in parallel
  const subjects = await Promise.all(
    allData.map((d) => prisma.subject.create({ data: { slug: d.subject.slug, name: d.subject.name } }))
  );
  subjects.forEach((s) => console.log(`  Subject: ${s.name}`));

  // 4. Create deThi with nested questions — batched parallel
  const deThiBySubject = new Map<string, { id: string; subjectId: string }[]>();
  let totalDeThi = 0;
  let totalQuestions = 0;

  for (let fi = 0; fi < allData.length; fi++) {
    const data = allData[fi];
    const subject = subjects[fi];
    const subjectDeThi: { id: string; subjectId: string }[] = [];

    for (let start = 0; start < data.deThi.length; start += CONCURRENCY) {
      const batch = data.deThi.slice(start, start + CONCURRENCY);
      const results = await Promise.all(
        batch.map((deThi) =>
          prisma.deThi.create({
            data: {
              subjectId: subject.id,
              title: deThi.title,
              source: deThi.source || "Pinky Exam Bank",
              tags: JSON.stringify(deThi.tags || []),
              normalizedTitle: normalizeVietnamese(deThi.title),
              deThiQuestions: {
                create: deThi.questions.map((q, qi) => ({
                  orderIndex: qi,
                  question: {
                    create: {
                      subjectId: subject.id,
                      type: q.type || "mcq",
                      content: q.content,
                      options: JSON.stringify(shuffleArray(q.options)),
                      correctAnswer: q.correctAnswer,
                      explanation: q.explanation,
                      tags: JSON.stringify(uniqueTags(q.tags || [])),
                    },
                  },
                })),
              },
            },
          })
        )
      );
      results.forEach((dt) => subjectDeThi.push({ id: dt.id, subjectId: dt.subjectId }));
      totalDeThi += results.length;
      totalQuestions += batch.reduce((s, d) => s + d.questions.length, 0);
    }
    deThiBySubject.set(subject.id, subjectDeThi);
    console.log(`  ${jsonFiles[fi]}: ${data.deThi.length} đề, ${data.deThi.reduce((s, d) => s + d.questions.length, 0)} questions ✓`);
  }

  console.log(`  Total: ${totalDeThi} đề, ${totalQuestions} questions`);

  // 5. Create users in parallel
  const [huyenmyHash, pinkyHash] = await Promise.all([
    bcrypt.hash("my1234", 10),
    bcrypt.hash("pinky1234", 10),
  ]);
  const [huyenmy, pinky] = await Promise.all([
    prisma.user.create({ data: { username: "huyenmy", passwordHash: huyenmyHash, plan: "premium" } }),
    prisma.user.create({ data: { username: "pinky", passwordHash: pinkyHash, plan: "basic" } }),
  ]);
  console.log("  Users: huyenmy (premium), pinky (basic) ✓");

  // 6. Pre-fetch ALL deThiQuestions in ONE query (instead of 50 individual findMany)
  const allDeThiQuestions = await prisma.deThiQuestion.findMany({
    orderBy: { orderIndex: "asc" },
    include: { question: true },
  });
  const dthiQuestionsByDeThiId = new Map<string, typeof allDeThiQuestions>();
  for (const dq of allDeThiQuestions) {
    const arr = dthiQuestionsByDeThiId.get(dq.deThiId) || [];
    arr.push(dq);
    dthiQuestionsByDeThiId.set(dq.deThiId, arr);
  }

  // 7. Build all quiz attempt data in memory (no DB calls)
  const subjectIds = Array.from(deThiBySubject.keys());
  const ATTEMPTS_PER_SUBJECT = 5;

  interface AttemptData {
    userId: string;
    deThiId: string;
    subjectId: string;
    mode: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: Date;
    answers: { questionId: string; userAnswer: string; isCorrect: boolean }[];
  }

  function buildAttempts(
    userId: string,
    baseSeed: number,
    scoreRange: [number, number],
    daysSpread: number
  ): AttemptData[] {
    const result: AttemptData[] = [];
    let dayOffset = daysSpread;

    for (let sIdx = 0; sIdx < subjectIds.length; sIdx++) {
      const subjectDeThi = deThiBySubject.get(subjectIds[sIdx])!;

      for (let aIdx = 0; aIdx < ATTEMPTS_PER_SUBJECT; aIdx++) {
        const dt = subjectDeThi[Math.floor(rand(baseSeed + sIdx * 100 + aIdx) * subjectDeThi.length)];
        const dthiQuestions = dthiQuestionsByDeThiId.get(dt.id) || [];
        const totalQs = dthiQuestions.length;

        const progress = (aIdx + 1) / ATTEMPTS_PER_SUBJECT;
        const minPct = scoreRange[0] + (scoreRange[1] - scoreRange[0]) * 0.3 * progress;
        const maxPct = scoreRange[0] + (scoreRange[1] - scoreRange[0]) * progress;
        const pctSeed = rand(baseSeed + sIdx * 100 + aIdx + 500);
        const percentage = Math.round(minPct + pctSeed * (maxPct - minPct));
        const score = Math.round((percentage / 100) * totalQs);

        const correctSet = new Set<number>();
        const seedBase = baseSeed + sIdx * 1000 + aIdx * 100 + percentage;
        let attempts = 0;
        while (correctSet.size < score && correctSet.size < totalQs && attempts < totalQs * 10) {
          correctSet.add(Math.floor(rand(seedBase + attempts) * totalQs));
          attempts++;
        }

        const mode = rand(baseSeed + sIdx * 777 + aIdx * 13) < 0.6 ? "practice" : "test";
        const completedAt = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);

        const answers = dthiQuestions.map((dq, qIdx) => {
          const isCorrect = correctSet.has(qIdx);
          const options = dq.question.options ? (JSON.parse(dq.question.options) as string[]) : [];
          const wrongs = options.filter((o) => o !== dq.question.correctAnswer);
          let userAnswer: string;
          if (isCorrect) userAnswer = dq.question.correctAnswer;
          else if (wrongs.length > 0) userAnswer = wrongs[Math.floor(rand(seedBase + qIdx + 500) * wrongs.length)];
          else userAnswer = "";
          return { questionId: dq.questionId, userAnswer, isCorrect };
        });

        result.push({
          userId,
          deThiId: dt.id,
          subjectId: dt.subjectId,
          mode,
          score,
          totalQuestions: totalQs,
          percentage,
          completedAt,
          answers,
        });
        dayOffset -= Math.floor(daysSpread / (subjectIds.length * ATTEMPTS_PER_SUBJECT));
      }
    }
    return result;
  }

  const huyenmyAttempts = buildAttempts(huyenmy.id, 1000, [45, 85], 60);
  const pinkyAttempts = buildAttempts(pinky.id, 2000, [30, 75], 58);
  const allAttempts = [...huyenmyAttempts, ...pinkyAttempts];
  console.log(`  Seeding ${allAttempts.length} quiz attempts...`);

  // 8. Create attempts + answers in parallel batches
  for (let i = 0; i < allAttempts.length; i += CONCURRENCY) {
    const batch = allAttempts.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (att) => {
        const attempt = await prisma.quizAttempt.create({
          data: {
            userId: att.userId,
            deThiId: att.deThiId,
            subjectId: att.subjectId,
            mode: att.mode,
            score: att.score,
            totalQuestions: att.totalQuestions,
            percentage: att.percentage,
            completedAt: att.completedAt,
          },
        });
        await prisma.quizAnswer.createMany({
          data: att.answers.map((a) => ({
            attemptId: attempt.id,
            questionId: a.questionId,
            userAnswer: a.userAnswer,
            isCorrect: a.isCorrect,
          })),
        });
      })
    );
  }

  console.log(`  Quiz attempts: ${huyenmyAttempts.length} for huyenmy, ${pinkyAttempts.length} for pinky`);
  console.log(`Seeding complete in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

export async function disconnectSeedDb() {
  await prisma.$disconnect();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  seed()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => disconnectSeedDb());
}
