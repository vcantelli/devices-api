import { AppError } from "@/shared/errors/AppError";
import { DeviceState } from "../enums/DeviceState";

/**
 * Device properties used to instantiate the entity.
 */
export interface DeviceProps {
  id: string;
  name: string;
  brand: string;
  state: DeviceState;
  createdAt: Date;
}

/**
 * Domain entity representing a Device.
 *
 * Business rules:
 * - Devices cannot have their name or brand changed while in use.
 * - Devices cannot be deleted while in use.
 */
export class Device {
  public readonly id: string;
  public name: string;
  public brand: string;
  public state: DeviceState;
  public readonly createdAt: Date;

  constructor(props: DeviceProps) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.state = props.state;
    this.createdAt = props.createdAt;
  }

  /**
   * Applies partial updates to the device.
   * Only name, brand, and state can be updated.
   *
   * @param data - Fields to update.
   * @throws AppError if trying to change name or brand while the device is in use.
   */
  public update(data: Partial<Pick<Device, "name" | "brand" | "state">>) {
    this.ensureCanBeUpdated(data);

    if (data.name !== undefined) this.name = data.name;
    if (data.brand !== undefined) this.brand = data.brand;
    if (data.state !== undefined) this.state = data.state;
  }

  /**
   * Validates whether the device can be deleted.
   *
   * @throws AppError if the device is currently in use.
   */
  public ensureCanBeDeleted(): void {
    if (this.state === DeviceState.IN_USE) {
      throw new AppError("Cannot delete device that is in use", 400);
    }
  }

  /**
   * Internal method that validates whether the name or brand can be updated.
   *
   * @param data - Fields to check for restricted updates.
   * @throws AppError if trying to update name or brand while the device is in use.
   */
  private ensureCanBeUpdated(data: Partial<Pick<Device, "name" | "brand">>): void {
    const tryingToChangeImmutableFields = data.name || data.brand;

    if (this.state === DeviceState.IN_USE && tryingToChangeImmutableFields) {
      throw new AppError("Cannot change name or brand of a device that is in use", 400);
    }
  }

  /**
   * Marks the device as in use.
   */
  public activate() {
    this.state = DeviceState.IN_USE;
  }

  /**
   * Marks the device as inactive.
   */
  public deactivate() {
    this.state = DeviceState.INACTIVE;
  }
}
