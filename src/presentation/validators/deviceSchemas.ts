import { z } from "zod";

export const deviceStateSchema = z.enum(["available", "in-use", "inactive"]);

export const createDeviceSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  state: deviceStateSchema
});

export const updateDeviceSchema = z.object({
  name: z.string().trim().min(1).optional(),
  brand: z.string().trim().min(1).optional(),
  state: deviceStateSchema.optional()
});
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid UUID")
});

export const brandParamSchema = z.object({
  brand: z.string().trim().min(1, "Brand is required")
});

export const stateParamSchema = z.object({
  state: deviceStateSchema
});
