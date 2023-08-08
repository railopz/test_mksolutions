import auth from '@config/auth';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  const passwordHash = await hash('123@456', 10);
  const administrator = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'test@test.com',
      password: passwordHash,
      is_admin: true,
    },
  });

  console.log(administrator);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
