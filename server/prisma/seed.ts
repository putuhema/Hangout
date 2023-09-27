import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const user: Prisma.UserCreateInput = {
  externalId: "user_2Vhzvk98it4bvxbRJKGHIniQEwT",
  firstname: "Tetsu",
  lastname: "Tetsu",
  email: "tetsutetsuhero@gmail.com",
  imageUrl:
    "https://images.clerk.dev/oauth_google/img_2V9yJOAnk2TF6oJZ0bKTv35Xehy.jpeg",
  username: "Tetsu",
  points: 0,
};

async function main() {
  console.log("Start Seeding...");
  await prisma.user.create({ data: user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
