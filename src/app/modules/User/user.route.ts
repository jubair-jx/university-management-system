import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { AnyZodObject } from "zod";
import { createStudentDataValidationSchema } from "../Student/student.validation";
import requestHandler from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  requestHandler(createStudentDataValidationSchema),
  userController.createStudent
);

export const userRouter = router;
