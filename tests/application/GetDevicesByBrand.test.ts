import { GetDevicesByBrand } from "@/application/use-cases/GetDevicesByBrand";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";

describe("GetDevicesByBrand Use Case", () => {
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

  it("should return devices by brand", async () => {
    const brand = "Brand A";
    const devices = [
      new Device({
        id: "1",
        name: "Device 1",
        brand,
        state: DeviceState.AVAILABLE,
        createdAt: new Date(),
      }),
    ];

    (mockRepo.findByBrand as jest.Mock).mockResolvedValue(devices);

    const useCase = new GetDevicesByBrand(mockRepo);
    const result = await useCase.execute({ brand });

    expect(result).toEqual(devices);
    expect(mockRepo.findByBrand).toHaveBeenCalledWith(brand);
  });
});
