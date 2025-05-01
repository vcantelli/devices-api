import { GetDeviceById } from "@/application/use-cases/GetDeviceById";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";

describe("GetDeviceById Use Case", () => {
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

  it("should return device if found", async () => {
    const device = new Device({
      id: "abc",
      name: "Test",
      brand: "Brand",
      state: DeviceState.AVAILABLE,
      createdAt: new Date(),
    });

    (mockRepo.findById as jest.Mock).mockResolvedValue(device);

    const useCase = new GetDeviceById(mockRepo);
    const result = await useCase.execute({ id: "abc" });

    expect(result).toBe(device);
    expect(mockRepo.findById).toHaveBeenCalledWith("abc");
  });

  it("should return null if device is not found", async () => {
    (mockRepo.findById as jest.Mock).mockResolvedValue(null);

    const useCase = new GetDeviceById(mockRepo);
    const result = await useCase.execute({ id: "not-found" });

    expect(result).toBeNull();
  });
});
