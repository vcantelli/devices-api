import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { AppError } from "@/shared/errors/AppError";

describe("Device entity", () => {
  const baseProps = {
    id: "uuid-1234",
    name: "Test Device",
    brand: "Test Brand",
    state: DeviceState.AVAILABLE,
    createdAt: new Date(),
  };

  it("should instantiate a device correctly", () => {
    const device = new Device(baseProps);
    expect(device).toBeInstanceOf(Device);
    expect(device.name).toBe("Test Device");
    expect(device.state).toBe(DeviceState.AVAILABLE);
  });

  it("should throw when trying to delete a device in use", () => {
    const device = new Device({ ...baseProps, state: DeviceState.IN_USE });
    expect(() => device.ensureCanBeDeleted()).toThrow(AppError);
  });

  it("should allow deletion when device is available", () => {
    const device = new Device({ ...baseProps, state: DeviceState.AVAILABLE });
    expect(() => device.ensureCanBeDeleted()).not.toThrow();
  });

  it("should throw when trying to update name or brand while in use", () => {
    const device = new Device({ ...baseProps, state: DeviceState.IN_USE });

    expect(() => device.update({ name: "New Name" })).toThrow(AppError);
    expect(() => device.update({ brand: "New Brand" })).toThrow(AppError);
  });

  it("should allow state update while in use", () => {
    const device = new Device({ ...baseProps, state: DeviceState.IN_USE });

    expect(() =>
      device.update({ state: DeviceState.INACTIVE })
    ).not.toThrow();

    expect(device.state).toBe(DeviceState.INACTIVE);
  });

  it("should allow update when device is not in use", () => {
    const device = new Device({ ...baseProps, state: DeviceState.AVAILABLE });

    device.update({ name: "Updated", brand: "UpdatedBrand" });

    expect(device.name).toBe("Updated");
    expect(device.brand).toBe("UpdatedBrand");
  });

  it("should activate and deactivate the device", () => {
    const device = new Device(baseProps);

    device.activate();
    expect(device.state).toBe(DeviceState.IN_USE);

    device.deactivate();
    expect(device.state).toBe(DeviceState.INACTIVE);
  });
});
