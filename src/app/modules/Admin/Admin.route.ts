import express from "express";
import requestHandler from "../../middleware/validateRequest";
import { updateAdminValidationSchema } from "./Admin.validation";
import { AdminControllers } from "./Admin.controller";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmins);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch(
  "/:id",
  requestHandler(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
