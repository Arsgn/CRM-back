import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany({ include: { category: true } });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    });

    if (!service) {
      res.status(404).json({ success: false, message: "Услуга не найдена" });
      return;
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getOne: ${error}` });
  }
};

const getByCategory = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany({
      where: { categoryId: Number(req.params.categoryId) },
    });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getByCategory: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { name, price, categoryId } = req.body;

    if (!name || isNaN(Number(price))) {
      res.status(400).json({ success: false, message: "Название и цена обязательны" });
      return;
    }

    const service = await prisma.service.create({
      data: { name, price: Number(price), categoryId: Number(categoryId) },
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.service.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Услуга не найдена" });
      return;
    }

    const service = await prisma.service.update({
      where: { id: Number(req.params.id) },
      data: {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : undefined,
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : undefined,
      },
    });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in update: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.service.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Услуга не найдена" });
      return;
    }

    await prisma.service.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: "Услуга успешно удалена" });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getOne, getByCategory, create, update, remove };