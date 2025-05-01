import { z } from "zod";

/**
 * Enum schema representing the allowed device states.
 * Valid values: 'available', 'in-use', 'inactive'.
 */
export const deviceStateSchema = z.enum(["available", "in-use", "inactive"]);

/**
 * Schema used to validate the request body when creating a new device.
 * All fields are required.
 */
export const createDeviceSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  state: deviceStateSchema
});

/**
 * Schema used to validate the request body when updating an existing device.
 * All fields are optional but must be valid if provided.
 */
export const updateDeviceSchema = z.object({
  name: z.string().trim().min(1).optional(),
  brand: z.string().trim().min(1).optional(),
  state: deviceStateSchema.optional()
});

/**
 * Schema for validating route params that include a device UUID.
 */
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid UUID")
});

/**
 * Schema for validating route params that include a brand name.
 */
export const brandParamSchema = z.object({
  brand: z.string().trim().min(1, "Brand is required")
});

/**
 * Schema for validating route params that include a device state.
 */
export const stateParamSchema = z.object({
  state: deviceStateSchema
});
