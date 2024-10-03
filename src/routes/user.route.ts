import route from "../lib/router";
import {
  getUsers,
  getUserById,
  getUserAndUserPostsByUserId,
  postUser,
  patchUser,
  deleteUser,
} from "../services/user.service";
route.get("/users", getUsers);
route.get("/users/:id", getUserById);
route.get("/users/:id/posts", getUserAndUserPostsByUserId);
route.post("/users", postUser);
route.patch("/users/:id", patchUser);
route.delete("/users/:id", deleteUser);
// route.get("/")

export { route as userRoute };
