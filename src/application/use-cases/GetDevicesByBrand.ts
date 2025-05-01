import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

/**
 * Input structure for retrieving devices filtered by brand.
 */
interface GetDevicesByBrandRequest {
  brand: string;
}

/**
 * Use case responsible for fetching all devices that match a specific brand.
 *
 * Business rules:
 * - Returns an empty array if no devices are found for the specified brand.
 */
export class GetDevicesByBrand {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the search for devices based on brand.
   *
   * @param request - Object containing the brand name to search for.
   * @returns A list of devices matching the given brand.
   */
  async execute(request: GetDevicesByBrandRequest): Promise<Device[]> {
    return await this.repository.findByBrand(request.brand);
  }
}
