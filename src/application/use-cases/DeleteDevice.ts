import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { AppError } from "@/shared/errors/AppError";

interface DeleteDeviceRequest {
  id: string;
}

export class DeleteDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: DeleteDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new AppError("Device not found", 404);

    device.ensureCanBeDeleted();

    await this.repository.delete(device.id);
  }
}
