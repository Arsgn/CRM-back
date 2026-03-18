import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const patients = await prisma.patient.findMany({ where: { deletedAt: null } });
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const patient = await prisma.patient.findFirst({
      where: { id: Number(req.params.id), deletedAt: null },
    });

    if (!patient) {
      res.status(404).json({ success: false, message: "Пациент не найден" });
      return;
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getOne: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { fullName, phone, birthDate, gender } = req.body;

    if (!fullName) {
      res.status(400).json({ success: false, message: "Имя обязательно" });
      return;
    }

    const patient = await prisma.patient.create({
      data: { fullName, phone, birthDate, gender },
    });

    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.patient.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Пациент не найден" });
      return;
    }

    const patient = await prisma.patient.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in update: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.patient.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Пациент не найден" });
      return;
    }

    await prisma.patient.update({
      where: { id: Number(req.params.id) },
      data: { deletedAt: new Date() },
    });

    res.status(200).json({ success: true, message: "Пациент успешно удалён" });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getOne, create, update, remove };