import { db } from "../db";

export const createPosts = async ({
  content,
  authorId,
  title,
  slug,
}: {
  content: string;
  authorId: number;
  title: string;
  slug: string;
}) => {
  return await db.post.create({
    data: { content, authorId, title, slug },
  });
};

export const findTwoPosts = async () => {
  return await db.post.findMany({ take: 2 });
};

export const findSlugPost = async (slug: string) => {
  return await db.post.findFirst({ where: { slug }, select: {slug:true, title:true} });
};

export const findUserPostsByIdAndUserId = async ({
  authorId,
  id,
}: {
  authorId: number;
  id: number;
}) => {
  return await db.post.findMany({
    where: { id, authorId },
    include: { author: true },
  });
};
export const findPostsByIdAndSlug = async ({
  authorId,
  id,
  slug,
}: {
  authorId: number;
  id: number;
  slug: string;
}) => {
  return await db.post.findFirst({
    where: { id, slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const findALlPosts = async ({
  skip,
  postsPerPage,
}: {
  skip: number;
  postsPerPage: number;
}) => {
  return await db.post.findMany({
    take: postsPerPage,
    skip,
    select: {
      id: true,
      slug: true,
      content: true,
      title: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateContentPosts = async ({
  id,
  slug,
  title,
  content,
}: {
  id: number;
  slug: string;
  title: string;
  content: string;
}) => {
  return await db.post.update({
    where: {id},
    data: {
      slug,
      title,
      content,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      author:{
        select:{
          id: true,
          name: true,
          email: true
        }
      }
    },
  });
};


export const destroyPosts = async ({ id }: { id: number }) => {
  return await db.post.delete({ where: { id } });
}


export const destroyManyPosts = async ({ id }: { id: number }) => {
  return await db.post.deleteMany({ where: { authorId: id } });
}