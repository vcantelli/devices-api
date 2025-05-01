import { GetAllDevices } from "@/application/use-cases/GetAllDevices";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";

describe("GetAllDevices Use Case", () => {
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

  it("should return all devices", async () => {
    const devices = [
      new Device({
        id: "1",
        name: "Device 1",
        brand: "Brand A",
        state: DeviceState.AVAILABLE,
        createdAt: new Date(),
      }),
    ];

    (mockRepo.findAll as jest.Mock).mockResolvedValue(devices);

    const useCase = new GetAllDevices(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual(devices);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
