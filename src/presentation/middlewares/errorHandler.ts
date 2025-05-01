import { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/errors/AppError";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);

  return res.status(500).json({ error: "Internal server error" });
}
