import { DeviceState } from "../enums/DeviceState";

export interface DeviceProps {
  id: string;
  name: string;
  brand: string;
  state: DeviceState;
  createdAt: Date;
}

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

  public update(data: Partial<Pick<Device, "name" | "brand" | "state">>) {
    this.ensureCanBeUpdated(data);

    if (data.name !== undefined) this.name = data.name;
    if (data.brand !== undefined) this.brand = data.brand;
    if (data.state !== undefined) this.state = data.state;
  }

  public ensureCanBeDeleted(): void {
    if (this.state === DeviceState.IN_USE) {
      throw new Error("Cannot delete device that is in use");
    }
  }

  private ensureCanBeUpdated(data: Partial<Pick<Device, "name" | "brand">>): void {
    const tryingToChangeImmutableFields = data.name || data.brand;

    if (this.state === DeviceState.IN_USE && tryingToChangeImmutableFields) {
      throw new Error("Cannot change name or brand of a device that is in use");
    }
  }

  public activate() {
    this.state = DeviceState.IN_USE;
  }

  public deactivate() {
    this.state = DeviceState.INACTIVE;
  }
}
