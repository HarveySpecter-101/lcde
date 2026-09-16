const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.contactSubmission.count();
  console.log('Current submissions count:', count);
  const latest = await prisma.contactSubmission.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });
  console.log('Latest 5 submissions:', latest.map(s => ({ id: s.id, name: s.name, email: s.email, createdAt: s.createdAt })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
