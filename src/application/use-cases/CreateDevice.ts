import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { randomUUID } from "crypto";

/**
 * Data required to create a new device.
 */
interface CreateDeviceRequest {
  name: string;
  brand: string;
  state: DeviceState;
}

/**
 * Use case responsible for creating a new device.
 *
 * Business rules:
 * - Generates a unique ID for the device.
 * - Sets the current timestamp as the creation date.
 * - Persists the device using the provided repository.
 *
 * Does not return any data upon success.
 */export class CreateDevice {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the device creation logic.
   *
   * @param request - The input data including name, brand and state.
   */
  async execute(request: CreateDeviceRequest): Promise<void> {
    const device = new Device({
      id: randomUUID(),
      name: request.name,
      brand: request.brand,
      state: request.state,
      createdAt: new Date(),
    });

    await this.repository.create(device);
  }
}
