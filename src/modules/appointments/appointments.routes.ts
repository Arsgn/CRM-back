import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import appointmentsControllers from "./appointments.controllers";

const appointmentsRoutes = Router();

appointmentsRoutes.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"),
  appointmentsControllers.getAll,
);
appointmentsRoutes.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"),
  appointmentsControllers.getOne,
);
appointmentsRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "RECEPTIONIST"),
  appointmentsControllers.create,
);
appointmentsRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "RECEPTIONIST"),
  appointmentsControllers.update,
);
appointmentsRoutes.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"),
  appointmentsControllers.updateStatus,
);
appointmentsRoutes.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  appointmentsControllers.remove,
);

export default appointmentsRoutes;
