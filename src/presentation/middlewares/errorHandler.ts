import { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/errors/AppError";

/**
 * Global error handler middleware.
 *
 * - Handles known application errors (AppError) with proper HTTP status codes.
 * - Logs unexpected internal errors to the console.
 * - Sends a generic 500 response for unhandled exceptions.
 *
 * @param err - The error thrown during request processing.
 * @param _req - The Express request object (unused).
 * @param res - The Express response object.
 * @param _next - The Express next function (unused).
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);

  return res.status(500).json({ error: "Internal server error" });
}
