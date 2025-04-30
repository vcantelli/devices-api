import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { DeviceState } from "@/domain/enums/DeviceState";

interface DeleteDeviceRequest {
  id: string;
}

export class DeleteDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: DeleteDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new Error("Device not found");

    if (device.state === DeviceState.IN_USE) {
      throw new Error("Cannot delete a device in use");
    }

    await this.repository.delete(device.id);
  }
}
