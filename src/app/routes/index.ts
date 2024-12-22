import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route';
import { BlogsRoute } from '../modules/blog/blog.route';
import { AdminRoute } from '../modules/admin/admin.route';


const router = express.Router()

const moduleRoutes =[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/admin',
        route:AdminRoute
    },
    {
        path:'/blogs',
        route:BlogsRoute
    },

]

moduleRoutes.forEach(route =>router.use(route.path,route.route));




export default router;



