import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";

interface DeleteDeviceRequest {
  id: string;
}

export class DeleteDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: DeleteDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new Error("Device not found");

    device.ensureCanBeDeleted();

    await this.repository.delete(device.id);
  }
}
