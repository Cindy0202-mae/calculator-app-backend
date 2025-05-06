const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Calculator API running on port ${PORT}`);
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
})
