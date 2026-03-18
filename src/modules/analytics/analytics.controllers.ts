import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const snapshots = await prisma.analyticsSnapshot.findMany({
      orderBy: { date: "desc" },
    });
    res.status(200).json({ success: true, data: snapshots });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getSummary = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const [totalPatients, totalAppointments, payments] = await Promise.all([
      prisma.patient.count({ where: { deletedAt: null } }),
      prisma.appointment.count(),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: "COMPLETED" },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPatients,
        totalAppointments,
        totalRevenue: payments._sum.amount ?? 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getSummary: ${error}` });
  }
};

export default { getAll, getSummary };