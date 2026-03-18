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

const configCors = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
  ],
};

const router = Router();

router.use("/auth", cors(configCors), authRoutes);
router.use("/patient", cors(configCors), patientRoutes);
router.use("/categories", cors(configCors), categoriesRoutes);
router.use("/services", cors(configCors), servicesRoutes);
router.use("/appointments", cors(configCors), appointmentsRoutes);
router.use("/doctors", cors(configCors), doctorsRoutes);
router.use("/schedule", cors(configCors), scheduleRoutes);
router.use("/analytics", cors(configCors), analyticsRoutes);

export default router;