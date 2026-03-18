import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import appointmentsControllers from "./appointments.controllers";

const appointmentsRoutes = Router();

appointmentsRoutes.get("/get", authMiddleware, roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"), appointmentsControllers.getAll);
appointmentsRoutes.get("/get/:id", authMiddleware, roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"), appointmentsControllers.getOne);
appointmentsRoutes.post("/post", authMiddleware, roleMiddleware("ADMIN", "RECEPTIONIST"), appointmentsControllers.create);
appointmentsRoutes.put("/update/:id", authMiddleware, roleMiddleware("ADMIN", "RECEPTIONIST"), appointmentsControllers.update);
appointmentsRoutes.patch("/status/:id", authMiddleware, roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"), appointmentsControllers.updateStatus);
appointmentsRoutes.delete("/delete/:id", authMiddleware, roleMiddleware("ADMIN"), appointmentsControllers.remove);

export default appointmentsRoutes;