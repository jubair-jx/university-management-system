import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import studentRouter from "../modules/Student/student.route";
import academicRouter from "../modules/academicSemester/academic.route";
import facultyRouter from "../modules/academicFaculty/faculty.route";
import departmentRouter from "../modules/academicDepartment/departement.route";
import { FacultyRoutes } from "../modules/Faculty/Faculty.route";
import { AdminRoutes } from "../modules/Admin/Admin.route";

const router = Router();
//main route data array
const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/students",
    route: studentRouter,
  },
  {
    path: "/academic-semester",
    route: academicRouter,
  },
  {
    path: "/academic-faculty",
    route: facultyRouter,
  },

  {
    path: "/academic-department",
    route: departmentRouter,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
