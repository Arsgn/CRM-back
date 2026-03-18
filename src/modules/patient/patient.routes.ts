import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import patientControllers from "./patient.controllers";

const patientRoutes = Router();

patientRoutes.get("/get", authMiddleware, roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"), patientControllers.getAll);
patientRoutes.get("/get/:id", authMiddleware, roleMiddleware("ADMIN", "DOCTOR", "RECEPTIONIST"), patientControllers.getOne);
patientRoutes.post("/post", authMiddleware, roleMiddleware("ADMIN", "RECEPTIONIST"), patientControllers.create);
patientRoutes.put("/update/:id", authMiddleware, roleMiddleware("ADMIN", "RECEPTIONIST"), patientControllers.update);
patientRoutes.delete("/delete/:id", authMiddleware, roleMiddleware("ADMIN"), patientControllers.remove);

export default patientRoutes;