import { prisma } from "../db/prisma";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import type { Device as PrismaDevice } from "@prisma/client";

const DomainToPrismaState = {
  "available": "available",
  "in-use": "in_use",
  "inactive": "inactive",
} as const;

const PrismaToDomainState = {
  "available": "available",
  "in_use": "in-use",
  "inactive": "inactive",
} as const;

export class PrismaDeviceRepository implements IDeviceRepository {
  async create(device: Device): Promise<void> {
    await prisma.device.create({
      data: {
        id: device.id,
        name: device.name,
        brand: device.brand,
        state: DomainToPrismaState[device.state],
        createdAt: device.createdAt,
      },
    });
  }

  async update(device: Device): Promise<void> {
    await prisma.device.update({
      where: { id: device.id },
      data: {
        name: device.name,
        brand: device.brand,
        state: DomainToPrismaState[device.state],
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.device.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Device | null> {
    const data = await prisma.device.findUnique({ where: { id } });
    return data ? this.mapToDomain(data) : null;
  }

  async findAll(): Promise<Device[]> {
    const result = await prisma.device.findMany();
    return result.map(this.mapToDomain);
  }

  async findByBrand(brand: string): Promise<Device[]> {
    const result = await prisma.device.findMany({ where: { brand } });
    return result.map(this.mapToDomain);
  }

  async findByState(state: DeviceState): Promise<Device[]> {
    const result = await prisma.device.findMany({
      where: {
        state: DomainToPrismaState[state],
      },
    });
    return result.map(this.mapToDomain);
  }

  private mapToDomain(data: PrismaDevice): Device {
    return new Device({
      id: data.id,
      name: data.name,
      brand: data.brand,
      state: PrismaToDomainState[data.state],
      createdAt: data.createdAt,
    });
  }
}
