export const DeviceState = {
  AVAILABLE: 'available',
  IN_USE: 'in-use',
  INACTIVE: 'inactive',
} as const;

export type DeviceState = typeof DeviceState[keyof typeof DeviceState];
