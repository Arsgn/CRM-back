import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";
import { AppointmentStatus } from "@prisma/client";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { doctorId, patientId, date, status } = req.query;
    const where: any = {};
    if (doctorId) where.doctorId = Number(doctorId);
    if (patientId) where.patientId = Number(patientId);
    if (date) {
      const start = new Date(date as string);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date as string);
      end.setHours(23, 59, 59, 999);

      where.date = {
        gte: start,
        lte: end,
      };
    }
    if (status) where.status = status as AppointmentStatus;

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: true,
        appointmentServices: {
          include: {
            service: {
              include: {
                category: true,
              },
            },
          },
        },
        payment: true,
      },
      orderBy: { date: "desc" },
    });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        patient: true,
        doctor: true,
        appointmentServices: {
          include: {
            service: {
              include: {
                category: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    if (!appointment) {
      res.status(404).json({ success: false, message: "Запись не найдена" });
      return;
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: `Error in getOne: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      phone,
      birthDate,
      gender,
      doctorId,
      serviceId,
      status,
      timeStart,
      timeEnd,
      paymentMethod,
      amount,
    } = req.body;

    if (!fullName || !doctorId || !serviceId || !timeStart || !timeEnd) {
      res
        .status(400)
        .json({ success: false, message: "Заполните все обязательные поля" });
      return;
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(doctorId) },
    });
    if (!doctor) {
      res.status(400).json({ success: false, message: "Врач не найден" });
      return;
    }

    const patient = await prisma.patient.create({
      data: {
        fullName,
        phone: phone || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        gender: gender || null,
      },
    });

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: Number(doctorId),
        date: new Date(),
        timeStart,
        timeEnd,
        status: status ?? "SCHEDULED",
        appointmentServices: {
          create: [{ serviceId: Number(serviceId) }],
        },
      },
      include: {
        patient: true,
        doctor: true,
        appointmentServices: { include: { service: true } },
        payment: true,
      },
    });

    if (amount && paymentMethod) {
      await prisma.payment.create({
        data: {
          appointmentId: appointment.id,
          amount: Number(amount),
          method: paymentMethod,
          status: "COMPLETED",
          paidAt: new Date(),
        },
      });
    }

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.appointment.findUnique({
      where: { id: Number(req.params.id) },
    });
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
    res
      .status(500)
      .json({ success: false, error: `Error in update: ${error}` });
  }
};

const updateStatus = async (
  req: CustomRequest,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id: Number(req.params.id) },
      data: { status: status as AppointmentStatus },
    });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: `Error in updateStatus: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.appointment.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!exists) {
      res.status(404).json({ success: false, message: "Запись не найдена" });
      return;
    }

    await prisma.appointment.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: "Запись успешно удалена" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getOne, create, update, updateStatus, remove };
