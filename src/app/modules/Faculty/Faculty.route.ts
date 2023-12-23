import express from "express";
import { FacultyControllers } from "./Faculty.controller";
import requestHandler from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./Faculty.validation";

const router = express.Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  requestHandler(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get("/", FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
