import { AppError } from "@/shared/errors/AppError";

describe("AppError", () => {
  it("should create an error with default status 400", () => {
    const error = new AppError("Something went wrong");
    expect(error.message).toBe("Something went wrong");
    expect(error.statusCode).toBe(400);
  });

  it("should create an error with custom status code", () => {
    const error = new AppError("Not Found", 404);
    expect(error.statusCode).toBe(404);
  });
});
