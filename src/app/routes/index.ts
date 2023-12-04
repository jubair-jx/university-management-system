import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import studentRouter from "../modules/Student/student.route";

const router = Router();
//main route data array
const routesData = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/students",
    route: studentRouter,
  },
];
//route data loop
routesData.forEach((route) => router.use(route.path, router.route));

export default router;
