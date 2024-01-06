import express from "express";
import { AuthValidation } from "./auth.validation";
import requestHandler from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";

export const authRouter = express.Router();

authRouter.post(
  "/login",
  requestHandler(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
