import { Request, Response } from "express";
import {
  createUser,
  destroyUser,
  findUser,
  findUserAndPosts,
  findUserAndUserPostsByUserId,
  findUserById,
  findUserEmail,
  updateUserById,
} from "../repositories/user.repository";
import { destroyManyPosts } from "../repositories/posts.repository";
export async function getUsers(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const userPerPage = 10;
  const skip = (page - 1) * userPerPage;
  const data = await findUser({ skip, userPerPage });
  res.status(200).json({ data });
}

export async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const data = await findUserById({ id });
  if (!data) {
    res.status(404).json({ msg: "User not found" });
    return;
  }
  res.status(200).json({
    data,
  });
}

export async function getUserAndUserPosts(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 2;

  const data = await findUserAndPosts(page, pageSize);
  res.status(200).json({ data });
}
export async function getUserAndUserPostsByUserId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const page = Number(req.query.page) || 1;
  const postsPerPage = 5;
  const skip = (page - 1) * postsPerPage;
  const data = await findUserAndUserPostsByUserId({ id, postsPerPage, skip });
  if (!data) {
    res.status(404).json({ msg: "User not found" });
    return;
  }
  res.status(200).json({ data });
}

export async function postUser(req: Request, res: Response) {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ msg: "Missing name or email" });
    return;
  }
  const verifyEmail = await findUserEmail(email);
  if (verifyEmail) {
    res.status(400).json({ msg: "Email already exists" });
    return;
  }
  try {
    const data = await createUser({ name, email });
    if (!data) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}

export async function patchUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ msg: "Missing name or email" });
    return;
  }
  try {
    const data = await updateUserById({ id, name, email });
    if (!data) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const dataPosts = await destroyManyPosts({ id });
  const data = await destroyUser({ id });
  if (!data || !dataPosts) {
    res.status(404).json({ msg: "User not found" });
    return;
  }
  res.status(200).json({ msg: "User deleted successfully" });
}
