import { Device } from "../entities/Device";
import { DeviceState } from "../enums/DeviceState";

export interface IDeviceRepository {
  create(device: Device): Promise<void>;
  update(device: Device): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Device | null>;
  findAll(): Promise<Device[]>;
  findByBrand(brand: string): Promise<Device[]>;
  findByState(state: DeviceState): Promise<Device[]>;
}
