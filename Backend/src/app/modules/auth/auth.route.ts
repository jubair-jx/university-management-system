import express from "express";
import auth from "../../middleware/auth";
import requestHandler from "../../middleware/validateRequest";
import { USER_ROLE } from "../User/user.constant";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

export const authRouter = express.Router();

authRouter.post(
  "/login",
  requestHandler(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
authRouter.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  requestHandler(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);
