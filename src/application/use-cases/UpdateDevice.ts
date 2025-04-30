import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { DeviceState } from "@/domain/enums/DeviceState";

interface UpdateDeviceRequest {
  id: string;
  name?: string;
  brand?: string;
  state?: string;
}

export class UpdateDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: UpdateDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new Error("Device not found");

    let state: DeviceState | undefined = undefined;

    if (request.state) {
      if (!Object.values(DeviceState).includes(request.state as DeviceState)) {
        throw new Error("Invalid device state");
      }
      state = request.state as DeviceState;
    }

    device.update({
      name: request.name,
      brand: request.brand,
      state,
    });

    await this.repository.update(device);
  }
}
