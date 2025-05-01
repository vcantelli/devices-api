import { Device } from "../entities/Device";
import { DeviceState } from "../enums/DeviceState";

/**
 * Repository interface for managing Device persistence.
 *
 * This abstraction allows decoupling of the domain layer from the actual data source.
 */
export interface IDeviceRepository {
  /**
   * Persists a new device.
   * @param device - The device entity to be created.
   */
  create(device: Device): Promise<void>;

  /**
   * Updates an existing device.
   * @param device - The device entity with updated data.
   */
  update(device: Device): Promise<void>;

  /**
   * Deletes a device by its unique ID.
   * @param id - The unique identifier of the device to delete.
   */
  delete(id: string): Promise<void>;

  /**
   * Finds a device by its unique ID.
   * @param id - The ID to search for.
   * @returns The found device or null if not found.
   */
  findById(id: string): Promise<Device | null>;

  /**
   * Retrieves all devices from the repository.
   * @returns An array of all devices.
   */
  findAll(): Promise<Device[]>;

  /**
   * Finds devices by brand.
   * @param brand - The brand name to filter by.
   * @returns A list of devices matching the brand.
   */
  findByBrand(brand: string): Promise<Device[]>;

  /**
   * Finds devices by state.
   * @param state - The device state to filter by.
   * @returns A list of devices matching the state.
   */
  findByState(state: DeviceState): Promise<Device[]>;
}
