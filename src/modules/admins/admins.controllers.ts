import { Request, Response } from "express";
import prisma from "../../prisma";

const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
        deletedAt: null,
      },
    });

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins" });
  }
};

export { getAdmins };