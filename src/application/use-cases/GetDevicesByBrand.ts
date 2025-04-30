import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";

interface GetDevicesByBrandRequest {
  brand: string;
}

export class GetDevicesByBrand {
  constructor(private readonly repository: IDeviceRepository) {}

  async execute(request: GetDevicesByBrandRequest): Promise<Device[]> {
    return await this.repository.findByBrand(request.brand);
  }
}
