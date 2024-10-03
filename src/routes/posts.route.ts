import route from "../lib/router";
import {
  deletePosts,
  getAllPosts,
  getPostsByIdAndSlug,
  patchPostsContent,
  postPosts,
} from "../services/posts.service";
route.get("/posts", getAllPosts);
route.get("/posts/:id", getPostsByIdAndSlug);
route.post("/posts", postPosts);
route.patch("/posts/:id", patchPostsContent);
route.delete("/posts/:id", deletePosts);

export { route as postsRoute };
