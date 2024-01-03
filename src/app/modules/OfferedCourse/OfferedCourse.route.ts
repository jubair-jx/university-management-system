import express from "express";
import requestHandler from "../../middleware/validateRequest";
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import { OfferedCourseValidations } from "./OfferedCourse.validation";

export const OfferedCourseRouter = express.Router();

OfferedCourseRouter.get("/", OfferedCourseControllers.getAllOfferedCourses);

OfferedCourseRouter.get(
  "/:id",
  OfferedCourseControllers.getSingleOfferedCourses
);

OfferedCourseRouter.post(
  "/create-offered-course",
  requestHandler(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

OfferedCourseRouter.patch(
  "/:id",
  requestHandler(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

OfferedCourseRouter.delete(
  "/:id",
  OfferedCourseControllers.deleteOfferedCourseFromDB
);
