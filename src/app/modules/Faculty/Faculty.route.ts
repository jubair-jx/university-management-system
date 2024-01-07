import express from "express";
import { FacultyControllers } from "./Faculty.controller";
import requestHandler from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./Faculty.validation";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  requestHandler(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get("/", auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
