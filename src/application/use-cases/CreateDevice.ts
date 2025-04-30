import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { randomUUID } from "crypto";

interface CreateDeviceRequest {
  name: string;
  brand: string;
  state: DeviceState;
}

export class CreateDevice {
  constructor(private readonly repository: IDeviceRepository) {}

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
