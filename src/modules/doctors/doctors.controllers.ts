import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const doctors = await prisma.doctor.findMany();

    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!doctor) {
      res.status(404).json({ success: false, message: "Врач не найден" });
      return;
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const create = async (req: CustomRequest, res: Response) => {
  try {
    const { name, phone, speciality, cabinet, experience } = req.body;

    if (!name || !speciality) {
      return res.status(400).json({
        success: false,
        message: "Имя и специальность обязательны",
      });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        phone,
        speciality,
        cabinet,
        experience: experience ? Number(experience) : null,
      },
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const exists = await prisma.doctor.findUnique({ where: { id } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Врач не найден" });
      return;
    }

    const { name, phone, speciality, cabinet, experience } = req.body;

    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        name,
        phone,
        speciality,
        cabinet,
        experience: experience ? Number(experience) : null,
      },
    });

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const exists = await prisma.doctor.findUnique({ where: { id } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Врач не найден" });
      return;
    }

    await prisma.doctor.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: "Удалено" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export default { getAll, getOne, create, update, remove };