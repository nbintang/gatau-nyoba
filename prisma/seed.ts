import { PrismaClient } from "@prisma/client";
import { findUser } from "../src/repositories/user.repository";
import { generateSlugTitle } from "../src/helper/format-slug";

const db = new PrismaClient();

async function main() {
  const dummyContent: string =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  // Generate data users and posts
  for (let i = 0; i < 100; i++) {
    // Create user
    const user = await db.user.create({
      data: {
        name: `user ${i}`,
        email: `user-${i}@gmail.com`,
      },
    });
    console.log({ user });
    // Create multiple posts for the user
    const postsData: {
      content: string;
      slug: string;
      title: string;
      authorId: number;
    }[] = [];
    for (let j = 0; j < 10; j++) {
      const title = `post ${i}-${j}`; 
      postsData.push({
        content: dummyContent,
        slug: generateSlugTitle(title),
        title: title,
        authorId: user.id,
      });
    }
    // Create all posts at once for the user
    const posts = await db.post.createMany({
      data: postsData,
    });

    console.log({ posts });
  }
}
main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
