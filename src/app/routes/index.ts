import express from 'express';
 

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
