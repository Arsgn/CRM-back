import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";
import { AppointmentStatus } from '@prisma/client';

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { doctorId, patientId, date, status } = req.query;
    const where: any = {};
    if (doctorId) where.doctorId = Number(doctorId);
    if (patientId) where.patientId = Number(patientId);
    if (date) where.date = new Date(date as string);
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: true,
        appointmentServices: { include: { service: true } },
        payment: true,
      },
      orderBy: { date: "desc" },
    });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        patient: true,
        doctor: true,
        appointmentServices: { include: { service: true } },
        payment: true,
      },
    });

    if (!appointment) {
      res.status(404).json({ success: false, message: "Запись не найдена" });
      return;
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getOne: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { patientId, doctorId, date, timeStart, timeEnd, serviceIds } = req.body;

    if (!patientId || !doctorId || !date || !timeStart || !timeEnd) {
      res.status(400).json({ success: false, message: "Заполните все обязательные поля" });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: Number(patientId),
        doctorId: Number(doctorId),
        date: new Date(date),
        timeStart,
        timeEnd,
        appointmentServices: {
          create: (serviceIds || []).map((serviceId: number) => ({ serviceId })),
        },
      },
      include: { appointmentServices: { include: { service: true } } },
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.appointment.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Запись не найдена" });
      return;
    }

    const appointment = await prisma.appointment.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in update: ${error}` });
  }
};

const updateStatus = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id: Number(req.params.id) },
      data: { status: status as AppointmentStatus },
    });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in updateStatus: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.appointment.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Запись не найдена" });
      return;
    }

    await prisma.appointment.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: "Запись успешно удалена" });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getOne, create, update, updateStatus, remove };