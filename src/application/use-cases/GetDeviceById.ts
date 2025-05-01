import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

/**
 * Input structure for retrieving a device by its ID.
 */
interface GetDeviceByIdRequest {
  id: string;
}

/**
 * Use case responsible for retrieving a single device by its unique identifier.
 *
 * Business rules:
 * - If the device does not exist, it returns null.
 * - No domain validation is applied here; logic is handled in the controller if needed.
 */
export class GetDeviceById {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the retrieval logic.
   *
   * @param request - The device ID to search for.
   * @returns The found Device entity or null if not found.
   */
  async execute(request: GetDeviceByIdRequest): Promise<Device | null> {
    return await this.repository.findById(request.id);
  }
}
