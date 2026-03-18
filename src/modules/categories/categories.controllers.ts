import { Response } from "express";
import prisma from "../../prisma";
import { CustomRequest } from "../../middleware/auth.middleware";

const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({ include: { services: true } });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getAll: ${error}` });
  }
};

const getOne = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(req.params.id) },
      include: { services: true },
    });

    if (!category) {
      res.status(404).json({ success: false, message: "Категория не найдена" });
      return;
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in getOne: ${error}` });
  }
};

const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ success: false, message: "Название обязательно" });
      return;
    }

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in create: ${error}` });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.category.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Категория не найдена" });
      return;
    }

    const category = await prisma.category.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in update: ${error}` });
  }
};

const remove = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const exists = await prisma.category.findUnique({ where: { id: Number(req.params.id) } });
    if (!exists) {
      res.status(404).json({ success: false, message: "Категория не найдена" });
      return;
    }

    await prisma.category.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: "Категория успешно удалена" });
  } catch (error) {
    res.status(500).json({ success: false, error: `Error in remove: ${error}` });
  }
};

export default { getAll, getOne, create, update, remove };