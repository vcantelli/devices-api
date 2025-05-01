import { GetDevicesByState } from "@/application/use-cases/GetDevicesByState";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { AppError } from "@/shared/errors/AppError";

describe("GetDevicesByState Use Case", () => {
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

  it("should return devices by valid state", async () => {
    const deviceList = [
      new Device({
        id: "1",
        name: "D1",
        brand: "B1",
        state: DeviceState.IN_USE,
        createdAt: new Date(),
      }),
    ];

    (mockRepo.findByState as jest.Mock).mockResolvedValue(deviceList);

    const useCase = new GetDevicesByState(mockRepo);
    const result = await useCase.execute({ state: DeviceState.IN_USE });

    expect(result).toEqual(deviceList);
    expect(mockRepo.findByState).toHaveBeenCalledWith(DeviceState.IN_USE);
  });

  it("should throw if state is invalid", async () => {
    const useCase = new GetDevicesByState(mockRepo);

    await expect(
      useCase.execute({ state: "invalid-state" })
    ).rejects.toThrow(AppError);
  });
});
