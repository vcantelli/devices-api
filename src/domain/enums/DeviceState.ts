/**
 * Enumeration of all valid device states.
 *
 * - 'available': Device is ready to be used.
 * - 'in-use': Device is currently assigned or in operation.
 * - 'inactive': Device is out of service or deactivated.
 */
export const DeviceState = {
  AVAILABLE: "available",
  IN_USE: "in-use",
  INACTIVE: "inactive",
} as const;

/**
 * Type representing the allowed values of device state.
 */
export type DeviceState = typeof DeviceState[keyof typeof DeviceState];
