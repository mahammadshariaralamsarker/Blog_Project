import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { BlogRoutes } from '../modules/blogs/blogs.routes';
 

const router = express.Router();
const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes ,
  },
  {
    path: '/blogs',
    route: BlogRoutes ,
  },

];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
