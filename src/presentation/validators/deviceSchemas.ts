import { z } from "zod";

export const deviceStateSchema = z.enum(["available", "in-use", "inactive"]);

export const createDeviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  state: deviceStateSchema
});

export const updateDeviceSchema = z.object({
  name: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  state: deviceStateSchema.optional()
});
