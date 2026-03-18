import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import categoriesControllers from "./categories.controllers";

const categoriesRoutes = Router();

categoriesRoutes.get("/get", categoriesControllers.getAll);
categoriesRoutes.get("/get/:id", categoriesControllers.getOne);
categoriesRoutes.post("/post", authMiddleware, roleMiddleware("ADMIN"), categoriesControllers.create);
categoriesRoutes.put("/update/:id", authMiddleware, roleMiddleware("ADMIN"), categoriesControllers.update);
categoriesRoutes.delete("/delete/:id", authMiddleware, roleMiddleware("ADMIN"), categoriesControllers.remove);

export default categoriesRoutes;