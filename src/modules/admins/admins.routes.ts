import { Router } from "express";
import { getAdmins } from "./admins.controllers";

const router = Router();

router.get("/get", getAdmins);

export default router;