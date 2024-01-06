import express, { NextFunction, Request, Response } from "express";

import { AnyZodObject } from "zod";
import { createStudentDataValidationSchema } from "../Student/student.validation";
import requestHandler from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/Faculty.validation";
import { createAdminValidationSchema } from "../Admin/Admin.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  // auth(USER_ROLE.admin),
  requestHandler(createStudentDataValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  // auth(USER_ROLE.admin),
  requestHandler(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  requestHandler(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const userRouter = router;
