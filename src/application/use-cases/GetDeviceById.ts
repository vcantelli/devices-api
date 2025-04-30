import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

interface GetDeviceByIdRequest {
  id: string;
}

export class GetDeviceById {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: GetDeviceByIdRequest): Promise<Device | null> {
    return await this.repository.findById(request.id);
  }
}
