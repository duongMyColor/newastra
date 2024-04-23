import { UserIF } from '@repo/types/user';
import { PrismaClient } from '.prisma/client';
import {
  defaultAnimalClass,
  defaultProducts,
  defaultUsers,
} from '@repo/consts/user';
import { ProductPostIF } from '@repo/types/product';
import { AnimalClassificationPostIF } from '@repo/types/animal';
const prisma = new PrismaClient();

/**
 * Seed default users
 */
async function main() {
  for (const user of defaultUsers) {
    const defaultUser: UserIF = {
      ...user,
    };

    // Insert new user if existed
    const newUser = await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: defaultUser,
    });
    console.log(':::Default user:', newUser);
  }

  for (const product of defaultProducts) {
    const defaultProduct: ProductPostIF = {
      ...product,
    };

    // Insert new user if existed
    const newProduct = await prisma.product.upsert({
      where: { name: defaultProduct.name },
      update: {},
      create: defaultProduct,
    });
    console.log(':::Default Product:', newProduct);
  }

  for (const animalClass of defaultAnimalClass) {
    const defaultProduct: AnimalClassificationPostIF = {
      ...animalClass,
    };

    // Insert new user if existed
    const newAnimalClass = await prisma.animalClassification.upsert({
      where: { name: defaultProduct.name },
      update: {},
      create: defaultProduct,
    });
    console.log(':::Default AnimalClass:', newAnimalClass);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
