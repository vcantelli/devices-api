import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

/**
 * Use case responsible for retrieving all devices from the system.
 *
 * Business rules:
 * - No filters or pagination are applied at this level.
 * - Returns an array of Device entities as stored in the repository.
 */
export class GetAllDevices {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the retrieval logic.
   *
   * @returns A list of all registered devices.
   */
  async execute(): Promise<Device[]> {
    return await this.repository.findAll();
  }
}
