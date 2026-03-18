import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import doctorsControllers from "./doctors.controllers";

const doctorsRoutes = Router();

doctorsRoutes.get("/get", doctorsControllers.getAll);
doctorsRoutes.get("/get/:id", doctorsControllers.getOne);
doctorsRoutes.post("/post", authMiddleware, roleMiddleware("ADMIN"), doctorsControllers.create);
doctorsRoutes.put("/update/:id", authMiddleware, roleMiddleware("ADMIN"), doctorsControllers.update);
doctorsRoutes.delete("/delete/:id", authMiddleware, roleMiddleware("ADMIN"), doctorsControllers.remove);

export default doctorsRoutes;