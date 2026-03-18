import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import servicesControllers from "./services.controllers";

const servicesRoutes = Router();

servicesRoutes.get("/get", servicesControllers.getAll);
servicesRoutes.get("/get/:id", servicesControllers.getOne);
servicesRoutes.get("/category/:categoryId", servicesControllers.getByCategory);
servicesRoutes.post("/post", authMiddleware, roleMiddleware("ADMIN"), servicesControllers.create);
servicesRoutes.put("/update/:id", authMiddleware, roleMiddleware("ADMIN"), servicesControllers.update);
servicesRoutes.delete("/delete/:id", authMiddleware, roleMiddleware("ADMIN"), servicesControllers.remove);

export default servicesRoutes;