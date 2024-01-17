import express from "express";
import { academicSemsterController } from "./academic.controller";

const academicRouter = express.Router();

academicRouter.post(
  "/create-academic-semester",
  academicSemsterController.createAcademicSemester
);
academicRouter.get(
  "/get-academic-semester",
  academicSemsterController.getSemesters
);
academicRouter.get("/:id", academicSemsterController.getSingleSemester);
academicRouter.patch("/:id", academicSemsterController.updateSemester);
export default academicRouter;
