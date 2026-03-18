import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import authControllers from "./auth.controllers";

const authRoutes = Router();

authRoutes.post("/register", authControllers.register);
authRoutes.post("/login", authControllers.login);
authRoutes.get("/me", authMiddleware, authControllers.me);

export default authRoutes;