import { errorHandler } from "@/presentation/middlewares/errorHandler";
import { AppError } from "@/shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

describe("errorHandler middleware", () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  it("should handle AppError and return custom status and message", () => {
    const error = new AppError("Custom error", 418);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith({ error: "Custom error" });
  });

  it("should handle unknown errors and return 500", () => {
    const error = new Error("Unexpected error");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
