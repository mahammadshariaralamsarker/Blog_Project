import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { BlogRoutes } from '../modules/blogs/blogs.routes';
import { RegisterRoutes } from '../modules/Register/register.routes';
import { AuthRoute } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
 

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
  {
    path: '/auth/register',
    route: RegisterRoutes,
  },
  {
    path: '/auth/login',
    route: AuthRoute,
  },
  {
    path:'/admin',
    route:AdminRoutes
},

];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
