import { Response, NextFunction } from "express";
import { CustomRequest } from "./auth.middleware";

export const roleMiddleware = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    next();
  };
};