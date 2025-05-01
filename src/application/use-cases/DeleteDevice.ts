import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { AppError } from "@/shared/errors/AppError";

/**
 * Input structure to delete a device by its ID.
 */
interface DeleteDeviceRequest {
  id: string;
}

/**
 * Use case responsible for deleting a device.
 *
 * Business rules:
 * - It must exist in the repository.
 * - Devices marked as "in-use" cannot be deleted.
 *
 * Throws:
 * - AppError (404) if the device does not exist.
 * - Domain-level error if deletion is not allowed by business rules.
 */
export class DeleteDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the deletion logic.
   *
   * @param request - The device ID to be deleted.
   */
  async execute(request: DeleteDeviceRequest): Promise<void> {
    const device = await this.repository.findById(request.id);
    if (!device) throw new AppError("Device not found", 404);

    device.ensureCanBeDeleted();

    await this.repository.delete(device.id);
  }
}
