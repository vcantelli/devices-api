import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

export class GetAllDevices {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(): Promise<Device[]> {
    return await this.repository.findAll();
  }
}
