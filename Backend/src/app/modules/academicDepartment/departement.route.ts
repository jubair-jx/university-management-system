import express from "express";
import { AcademicDepartmentControllers } from "./department.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidation } from "./department.validation";
const departmentRouter = express.Router();

departmentRouter.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartmemt
);

departmentRouter.get(
  "/",
  AcademicDepartmentControllers.getAllAcademicDepartments
);

departmentRouter.get(
  "/:id",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

departmentRouter.patch(
  "/:id",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDeartment
);

export default departmentRouter;
