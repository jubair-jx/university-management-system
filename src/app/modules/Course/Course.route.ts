import express from "express";
import requestHandler from "../../middleware/validateRequest";
import { CourseValidations } from "./Course.validation";
import { coursesController } from "./Course.Controller";

const router = express.Router();

router.post(
  "/create-course",
  requestHandler(CourseValidations.createCourseValidationSchema),
  coursesController.createCourse
);

router.get("/:id", coursesController.getSingleCourse);

// router.patch(
//   "/:id",
//   requestHandler(updateFacultyValidationSchema),
//   FacultyControllers.updateFaculty
// );

router.delete("/:id", coursesController.deleteCourse);

router.get("/", coursesController.getAllCourses);

export const CourseRoutes = router;
