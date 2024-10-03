import { Request, Response } from "express";
import {
  createPosts,
  destroyPosts,
  findALlPosts,
  findPostsByIdAndSlug,
  updateContentPosts,
} from "../repositories/posts.repository";
import { generateSlugTitle } from "../helper/format-slug";
import { findSlugPost } from "../repositories/posts.repository";

export async function postPosts(req: Request, res: Response) {
  const { content, authorId, title } = req.body;
  if (!content || !authorId || !title) {
    res.status(400).json({ msg: "Missing content or authorId" });
    return;
  }
  const slug = await generateSlugTitle(title);
  try {
    const verifyTitle = await findSlugPost(slug);
    if (slug === verifyTitle?.slug) {
      res.status(400).json({ msg: "Title already exists" });
      return;
    }
    const data = await createPosts({
      content,
      authorId,
      title,
      slug,
    });
    if (!data) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}

export async function getPostsByIdAndSlug(req: Request, res: Response) {
  const id = Number(req.params.id);
  const authorId = Number(req.query.authorId);
  const slug = req.query.slug as string;
  const data = await findPostsByIdAndSlug({ id, slug, authorId });
  if (!data) {
    res.status(404).json({ msg: "Post not found" });
    return;
  }
  res.status(200).json({ data });
}

export async function getAllPosts(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const postsPerPage = 5;
  const skip = (page - 1) * postsPerPage;
  const data = await findALlPosts({ skip, postsPerPage });
  res.status(200).json({ data });
}

export async function patchPostsContent(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { content, title } = req.body;
  if (!content || !title) {
    res.status(400).json({ msg: "Missing content" });
    return;
  }
  try {
    const generatedSlug = await generateSlugTitle(title);
    const data = await updateContentPosts({
      slug: generatedSlug,
      content,
      title,
      id,
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}

export async function deletePosts(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = await destroyPosts({ id });
  if (data) res.status(200).json({ msg: "Post deleted successfully" });
}
