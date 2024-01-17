import express from "express";

import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import requestHandler from "../../middleware/validateRequest";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  requestHandler(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration
);

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistration);

router.put(
  "/:id",
  requestHandler(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
);

// router.get(
//   "/:id",
//   SemesterRegistrationController.getSingleSemesterRegistration
// );

// router.delete(
//   "/:id",
//   SemesterRegistrationController.deleteSemesterRegistration
// );

export const semesterRegistrationRoutes = router;
