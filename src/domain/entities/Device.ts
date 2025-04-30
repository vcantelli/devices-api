import { DeviceState } from "../enums/DeviceState";

export class Device {
  public readonly id: string;
  public name: string;
  public brand: string;
  public state: DeviceState;
  public readonly createdAt: Date;

  constructor(props: {
    id: string;
    name: string;
    brand: string;
    state: DeviceState;
    createdAt: Date;
  }) {
    const { id, name, brand, state, createdAt } = props;

    this.id = id;
    this.name = name;
    this.brand = brand;
    this.state = state;
    this.createdAt = createdAt;
  }

  update(data: Partial<Pick<Device, "name" | "brand" | "state">>) {
    if (this.state === DeviceState.IN_USE) {
      if (data.name && data.name !== this.name) {
        throw new Error("Cannot update name of a device in use.");
      }
      if (data.brand && data.brand !== this.brand) {
        throw new Error("Cannot update brand of a device in use.");
      }
    }

    if (data.name) this.name = data.name;
    if (data.brand) this.brand = data.brand;
    if (data.state) this.state = data.state;
  }
}
