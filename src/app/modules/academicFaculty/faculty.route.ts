import express from "express";
import { AcademicFacultyControllers } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { facultyValidation } from "./faculty.validation";
const facultyRouter = express.Router();

facultyRouter.post(
  "/create-academic-faculty",
  validateRequest(facultyValidation.academicSemValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty
);

facultyRouter.patch(
  "/:id",
  validateRequest(facultyValidation.updateAcademicSemValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty
);

facultyRouter.get("/:id", AcademicFacultyControllers.getSingleAcademicFaculty);
facultyRouter.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

export default facultyRouter;
