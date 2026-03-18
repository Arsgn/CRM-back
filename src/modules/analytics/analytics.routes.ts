import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import analyticsControllers from "./analytics.controllers";

const analyticsRoutes = Router();

analyticsRoutes.get("/get", authMiddleware, roleMiddleware("ADMIN"), analyticsControllers.getAll);
analyticsRoutes.get("/summary", authMiddleware, roleMiddleware("ADMIN"), analyticsControllers.getSummary);

export default analyticsRoutes;