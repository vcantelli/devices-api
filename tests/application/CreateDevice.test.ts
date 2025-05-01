import { CreateDevice } from "@/application/use-cases/CreateDevice";
import { DeviceState } from "@/domain/enums/DeviceState";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

describe("CreateDevice Use Case", () => {
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

  it("should create a new device with valid data", async () => {
    const useCase = new CreateDevice(mockRepo);

    const input = {
      name: "My Device",
      brand: "My Brand",
      state: DeviceState.AVAILABLE,
    };

    await useCase.execute(input);

    expect(mockRepo.create).toHaveBeenCalledTimes(1);

    const deviceArg = (mockRepo.create as jest.Mock).mock.calls[0][0];
    expect(deviceArg).toBeInstanceOf(Device);
    expect(deviceArg.name).toBe(input.name);
    expect(deviceArg.brand).toBe(input.brand);
    expect(deviceArg.state).toBe(input.state);
  });
});
