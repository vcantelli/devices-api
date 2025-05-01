import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { AppError } from "@/shared/errors/AppError";

/**
 * Input structure for retrieving devices filtered by their state.
 */
interface GetDevicesByStateRequest {
  state: string;
}

/**
 * Use case responsible for fetching devices that match a specific state.
 *
 * Business rules:
 * - Valid states are: "available", "in-use", and "inactive".
 * - If the provided state is not valid, it throws an AppError.
 * - Returns an empty array if no devices are found with that state.
 */
export class GetDevicesByState {
  constructor(private readonly repository: IDeviceRepository) {}

  /**
   * Executes the search for devices based on their state.
   *
   * @param request - Object containing the state value to filter by.
   * @throws AppError if the state is invalid.
   * @returns A list of devices matching the given state.
   */
  async execute(request: GetDevicesByStateRequest): Promise<Device[]> {
    if (!Object.values(DeviceState).includes(request.state as DeviceState)) {
      throw new AppError("Invalid device state", 400);
    }

    return await this.repository.findByState(request.state as DeviceState);
  }
}
