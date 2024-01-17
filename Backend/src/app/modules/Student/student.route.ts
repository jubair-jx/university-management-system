import express from "express";
import { StudentController } from "./student.controller";

const studentRouter = express.Router();

studentRouter.get("/", StudentController.getAllStudents);
studentRouter.get("/:studentId", StudentController.getSingleStudent);
studentRouter.delete("/:studentId", StudentController.deletedStudent);
studentRouter.patch("/:studentId", StudentController.updatedStudent);

export default studentRouter;
