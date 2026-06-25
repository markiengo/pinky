import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function slugify(str: string): string {
  return normalizeVietnamese(str)
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

async function main() {
  console.log("Seeding database...");

  // ── Subjects ──────────────────────────────────────────────────────
  const subjects = [
    { slug: "toan", name: "Toán" },
    { slug: "vat_ly", name: "Vật Lý" },
    { slug: "hoa_hoc", name: "Hóa Học" },
  ] as const;

  const subjectRecords = await Promise.all(
    subjects.map((s) =>
      prisma.subject.upsert({
        where: { slug: s.slug },
        update: { name: s.name },
        create: { slug: s.slug, name: s.name },
      })
    )
  );

  console.log(`  ${subjectRecords.length} subjects upserted`);

  // ── Đề thi placeholders (1-2 per subject) ────────────────────────
  const deThiData = [
    {
      subjectSlug: "toan",
      items: [
        { title: "Đề thi THPT QG 2024 – Toán", source: "Bộ GD&ĐT" },
        { title: "Đề thi thử Toán – Sở Hà Nội 2024", source: "Sở GD&ĐT Hà Nội" },
      ],
    },
    {
      subjectSlug: "vat_ly",
      items: [
        { title: "Đề thi THPT QG 2024 – Vật Lý", source: "Bộ GD&ĐT" },
      ],
    },
    {
      subjectSlug: "hoa_hoc",
      items: [
        { title: "Đề thi THPT QG 2024 – Hóa Học", source: "Bộ GD&ĐT" },
      ],
    },
  ];

  let deThiCount = 0;
  for (const group of deThiData) {
    const subject = subjectRecords.find((s) => s.slug === group.subjectSlug);
    if (!subject) continue;

    for (const item of group.items) {
      const normalized = normalizeVietnamese(item.title);
      const uniqueSlug = slugify(item.title);

      await prisma.deThi.upsert({
        where: { id: uniqueSlug },
        update: {
          title: item.title,
          source: item.source,
          normalizedTitle: normalized,
        },
        create: {
          id: uniqueSlug,
          subjectId: subject.id,
          title: item.title,
          source: item.source,
          normalizedTitle: normalized,
          tags: "[]",
        },
      });
      deThiCount++;
    }
  }

  console.log(`  ${deThiCount} de_thi upserted`);

  // ── Demo user ─────────────────────────────────────────────────────
  const demoPasswordHash = await bcrypt.hash("demo1234", 10);
  await prisma.user.upsert({
    where: { username: "demo" },
    update: { passwordHash: demoPasswordHash },
    create: { username: "demo", passwordHash: demoPasswordHash },
  });
  console.log("  demo user upserted (demo / demo1234)");

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
