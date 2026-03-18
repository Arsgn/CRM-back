import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";
import bcrypt from "bcrypt";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const doctors = await prisma.user.findMany({
      where: { role: "DOCTOR", deletedAt: null },
      include: { doctorProfile: true },
    });
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const doctor = await prisma.user.findFirst({
      where: { id: Number(req.params.id), role: "DOCTOR", deletedAt: null },
      include: { doctorProfile: true },
    });

    if (!doctor) {
      res.status(404).json({ success: false, message: "Врач не найден" });
      return;
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getOne: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { email, password, name, phone, speciality, cabinet, experience } = req.body;

    if (!email || !password || !speciality) {
      res.status(400).json({ success: false, message: "Email, пароль и специальность обязательны" });
      return;
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      res.status(400).json({ success: false, message: "Email уже занят" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: "DOCTOR",
        doctorProfile: { create: { speciality, cabinet, experience: Number(experience) } },
      },
      include: { doctorProfile: true },
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Врач не найден" });
      return;
    }

    const { speciality, cabinet, experience, ...userData } = req.body;
    const doctor = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        ...userData,
        ...(speciality || cabinet || experience
          ? { doctorProfile: { update: { speciality, cabinet, experience: Number(experience) } } }
          : {}),
      },
      include: { doctorProfile: true },
    });

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in update: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Врач не найден" });
      return;
    }

    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { deletedAt: new Date() },
    });

    res.status(200).json({ success: true, message: "Врач успешно удалён" });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getOne, create, update, remove };