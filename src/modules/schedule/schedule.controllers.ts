import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const schedules = await prisma.schedule.findMany({ include: { doctor: true } });
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getByDoctor = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const schedules = await prisma.schedule.findMany({
      where: { doctorId: Number(req.params.doctorId) },
    });

    if (!schedules.length) {
      res.status(404).json({ success: false, message: "Расписание не найдено" });
      return;
    }

    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getByDoctor: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { doctorId, dayOfWeek, timeStart, timeEnd } = req.body;

    if (!doctorId || dayOfWeek === undefined || !timeStart || !timeEnd) {
      res.status(400).json({ success: false, message: "Заполните все поля" });
      return;
    }

    const schedule = await prisma.schedule.create({
      data: { doctorId: Number(doctorId), dayOfWeek: Number(dayOfWeek), timeStart, timeEnd },
    });

    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.schedule.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Расписание не найдено" });
      return;
    }

    const schedule = await prisma.schedule.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in update: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.schedule.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Расписание не найдено" });
      return;
    }

    await prisma.schedule.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: "Расписание успешно удалено" });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getByDoctor, create, update, remove };