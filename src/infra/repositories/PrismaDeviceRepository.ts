import { prisma } from "../db/prisma";
import { IDeviceRepository } from "@/domain/repositories/IDeviceRepository";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import type { Device as PrismaDevice } from "@prisma/client";

/**
 * Maps domain-level state values to Prisma-compatible values.
 */
const DomainToPrismaState = {
  "available": "available",
  "in-use": "in_use",
  "inactive": "inactive",
} as const;

/**
 * Maps Prisma state values to domain-level values.
 */
const PrismaToDomainState = {
  "available": "available",
  "in_use": "in-use",
  "inactive": "inactive",
} as const;

/**
 * Repository implementation that uses Prisma to interact with a relational database.
 *
 * Responsible for persisting and retrieving Device entities using the Prisma ORM.
 */
export class PrismaDeviceRepository implements IDeviceRepository {
  /**
   * Persists a new device in the database.
   * @param device - The device entity to be saved.
   */
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

  /**
   * Updates an existing device in the database.
   * @param device - The device entity with updated fields.
   */
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

  /**
   * Deletes a device by its ID.
   * @param id - The ID of the device to delete.
   */
  async delete(id: string): Promise<void> {
    await prisma.device.delete({
      where: { id },
    });
  }

  /**
   * Retrieves a device by its ID.
   * @param id - The ID of the device to retrieve.
   * @returns The Device entity or null if not found.
   */
  async findById(id: string): Promise<Device | null> {
    const data = await prisma.device.findUnique({ where: { id } });
    return data ? this.mapToDomain(data) : null;
  }

  /**
   * Retrieves all devices from the database.
   * @returns An array of all Device entities.
   */
  async findAll(): Promise<Device[]> {
    const result = await prisma.device.findMany();
    return result.map(this.mapToDomain);
  }

  /**
   * Retrieves devices by brand.
   * @param brand - The brand to filter by.
   * @returns A list of devices matching the brand.
   */
  async findByBrand(brand: string): Promise<Device[]> {
    const result = await prisma.device.findMany({ where: { brand } });
    return result.map(this.mapToDomain);
  }

  /**
   * Retrieves devices by state.
   * @param state - The state to filter by.
   * @returns A list of devices matching the state.
   */
  async findByState(state: DeviceState): Promise<Device[]> {
    const result = await prisma.device.findMany({
      where: {
        state: DomainToPrismaState[state],
      },
    });
    return result.map(this.mapToDomain);
  }

  /**
   * Maps a raw Prisma device model to the domain Device entity.
   * @param data - The Prisma model object.
   * @returns The corresponding Device entity.
   */
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
