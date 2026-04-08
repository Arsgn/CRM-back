import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import categoriesRoutes from "../modules/categories/categories.routes";
import servicesRoutes from "../modules/services/services.routes";
import appointmentsRoutes from "../modules/appointments/appointments.routes";
import doctorsRoutes from "../modules/doctors/doctors.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import patientRoutes from "../modules/patient/patient.routes";
import adminRoutes from "../modules/admins/admins.routes";

const configCors = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
};

const router = Router();

router.use(cors(configCors)); 

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);      
router.use("/categories", categoriesRoutes);
router.use("/services", servicesRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/doctors", doctorsRoutes);        
router.use("/schedule", scheduleRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/admins", adminRoutes);

export default router;