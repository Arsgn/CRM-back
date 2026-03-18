import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import scheduleControllers from "./schedule.controllers";

const scheduleRoutes = Router();

scheduleRoutes.get("/get", authMiddleware, roleMiddleware("ADMIN", "DOCTOR"), scheduleControllers.getAll);
scheduleRoutes.get("/doctor/:doctorId", authMiddleware, roleMiddleware("ADMIN", "DOCTOR"), scheduleControllers.getByDoctor);
scheduleRoutes.post("/post", authMiddleware, roleMiddleware("ADMIN"), scheduleControllers.create);
scheduleRoutes.put("/update/:id", authMiddleware, roleMiddleware("ADMIN"), scheduleControllers.update);
scheduleRoutes.delete("/delete/:id", authMiddleware, roleMiddleware("ADMIN"), scheduleControllers.remove);

export default scheduleRoutes;