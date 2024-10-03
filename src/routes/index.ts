import { postsRoute } from './posts.route';
import { userRoute } from './user.route';
import route from '../lib/router';
route.use(postsRoute);
route.use(userRoute);
export default route;