import { DeleteDevice } from "@/application/use-cases/DeleteDevice";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { AppError } from "@/shared/errors/AppError";

describe("DeleteDevice Use Case", () => {
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

  it("should delete the device when it's available", async () => {
    const device = new Device({
      id: "123",
      name: "Test",
      brand: "Brand",
      state: DeviceState.AVAILABLE,
      createdAt: new Date(),
    });

    (mockRepo.findById as jest.Mock).mockResolvedValue(device);

    const useCase = new DeleteDevice(mockRepo);
    await useCase.execute({ id: "123" });

    expect(mockRepo.delete).toHaveBeenCalledWith("123");
  });

  it("should throw if device is not found", async () => {
    (mockRepo.findById as jest.Mock).mockResolvedValue(null);

    const useCase = new DeleteDevice(mockRepo);
    await expect(useCase.execute({ id: "not-found" })).rejects.toThrow(AppError);
  });

  it("should throw if device is in use", async () => {
    const device = new Device({
      id: "123",
      name: "Test",
      brand: "Brand",
      state: DeviceState.IN_USE,
      createdAt: new Date(),
    });

    (mockRepo.findById as jest.Mock).mockResolvedValue(device);

    const useCase = new DeleteDevice(mockRepo);
    await expect(useCase.execute({ id: "123" })).rejects.toThrow(AppError);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
