import { DeviceState } from "@/domain/enums/DeviceState";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";

interface UpdateDeviceRequest {
  id: string;
  name?: string;
  brand?: string;
  state?: DeviceState;
}

export class UpdateDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: UpdateDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new Error("Device not found");

    device.update({
      name: request.name,
      brand: request.brand,
      state: request.state,
    });

    await this.repository.update(device);
  }
}
