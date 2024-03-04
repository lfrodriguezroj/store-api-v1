import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'luis3@gmail.com' },
    update: {},
    create: {
      email: 'luis3@gmail.com',
      password: await argon.hash('pass123'),
      firstName: 'Luis',
      lastName: 'Rodríguez',
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Product 2',
      description: 'Product description',
      price: 100000,
      userId: user1.id,
    },
  });

  console.log({ user1, product1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
