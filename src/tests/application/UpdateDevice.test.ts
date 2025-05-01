import { UpdateDevice } from "@/application/use-cases/UpdateDevice";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { AppError } from "@/shared/errors/AppError";

describe("UpdateDevice Use Case", () => {
  const mockRepo: IDeviceRepository = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByBrand: jest.fn(),
    findByState: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update device properties when valid", async () => {
    const device = new Device({
      id: "abc",
      name: "Old Name",
      brand: "Old Brand",
      state: DeviceState.AVAILABLE,
      createdAt: new Date(),
    });

    (mockRepo.findById as jest.Mock).mockResolvedValue(device);

    const useCase = new UpdateDevice(mockRepo);
    await useCase.execute({
      id: "abc",
      name: "New Name",
      brand: "New Brand",
      state: DeviceState.INACTIVE,
    });

    expect(device.name).toBe("New Name");
    expect(device.brand).toBe("New Brand");
    expect(device.state).toBe(DeviceState.INACTIVE);
    expect(mockRepo.update).toHaveBeenCalledWith(device);
  });

  it("should throw if device not found", async () => {
    (mockRepo.findById as jest.Mock).mockResolvedValue(null);

    const useCase = new UpdateDevice(mockRepo);

    await expect(
      useCase.execute({ id: "invalid", name: "X" })
    ).rejects.toThrow(AppError);
  });

  it("should throw if trying to change name or brand of a device in use", async () => {
    const device = new Device({
      id: "abc",
      name: "Original",
      brand: "Brand",
      state: DeviceState.IN_USE,
      createdAt: new Date(),
    });

    (mockRepo.findById as jest.Mock).mockResolvedValue(device);

    const useCase = new UpdateDevice(mockRepo);

    await expect(
      useCase.execute({ id: "abc", name: "New Name" })
    ).rejects.toThrow(AppError);

    await expect(
      useCase.execute({ id: "abc", brand: "New Brand" })
    ).rejects.toThrow(AppError);
  });
});
