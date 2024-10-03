import { db } from "../db";

export const findUser = async ({
  userPerPage,
  skip,
}: {
  userPerPage: number;
  skip: number;
}) => {
  return await db.user.findMany({
    take: userPerPage,
    skip,
  });
};

export const findUserAndPosts = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const usersWithPosts = await db.user.findMany({
    take: pageSize,
    skip: skip,
    include: {
      posts: {
        take: pageSize,
        skip: skip,
      },
    },
  });

  return usersWithPosts;
};

export const findUserById = async ({ id }: { id: number }) => {
  return await db.user.findFirst({
    where: { id },
  });
};

export const findUserAndUserPostsByUserId = async ({
  id,
  postsPerPage,
  skip,
}: {
  id: number;
  postsPerPage: number;
  skip: number;
}) => {
  return await db.user.findFirst({
    where: { id },
    include: {
      posts: {
        take: postsPerPage,
        skip,
      },
    },
  });
};

export const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return await db.user.create({
    data: {
      name,
      email,
    },
  });
};

export const findUserEmail = async (email: string) => {
  return await db.user.findFirst({
    where: { email },
    select: { email: true },
  });
};

export const updateUserById = async ({
  id,
  name,
  email,
}: {
  id: number;
  name: string;
  email: string;
}) => {
  return await db.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
};


export const destroyUser = async ({ id }: { id: number }) => {
  return await db.user.delete({ where: { id } });
}