import { DeviceState } from "@/domain/enums/DeviceState";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { AppError } from "@/shared/errors/AppError";

/**
 * Input structure for updating a device.
 * All fields except `id` are optional, supporting partial updates.
 */
interface UpdateDeviceRequest {
  id: string;
  name?: string;
  brand?: string;
  state?: DeviceState;
}

/**
 * Use case responsible for updating an existing device.
 *
 * Business rules:
 * - Device must exist, otherwise throws AppError (404).
 * - Updating `name` or `brand` is not allowed if the device is currently in use.
 * - The update is partial: only provided fields will be changed.
 */
export class UpdateDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the device update logic.
   *
   * @param request - Partial data for the device update including the required ID.
   * @throws AppError if the device is not found.
   * @throws Domain-level errors if update is not allowed by business rules.
   */
  async execute(request: UpdateDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new AppError("Device not found", 404);

    device.update({
      name: request.name,
      brand: request.brand,
      state: request.state,
    });

    await this.repository.update(device);
  }
}
