/**
 * Helper to clean up stress test candidates from Supabase if needed.
 * Deletes submissions where email contains '@test-etudiant.ma' or '@lcde-audit.ma'.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  const result = await prisma.contactSubmission.deleteMany({
    where: {
      OR: [
        { email: { contains: '@test-etudiant.ma' } },
        { email: { contains: '@lcde-audit.ma' } }
      ]
    }
  });
  console.log(`Deleted ${result.count} test submissions.`);
  const remaining = await prisma.contactSubmission.count();
  console.log(`Remaining real submissions: ${remaining}`);
}

// clean().finally(() => prisma.$disconnect());
