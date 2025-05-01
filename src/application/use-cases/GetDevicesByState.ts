import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { AppError } from "@/shared/errors/AppError";

interface GetDevicesByStateRequest {
  state: string;
}

export class GetDevicesByState {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: GetDevicesByStateRequest): Promise<Device[]> {
    if (!Object.values(DeviceState).includes(request.state as DeviceState)) {
      throw new AppError("Invalid device state", 400);
    }

    return await this.repository.findByState(request.state as DeviceState);
  }
}
