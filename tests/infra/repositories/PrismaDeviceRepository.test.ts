import { PrismaDeviceRepository } from "@/infra/repositories/PrismaDeviceRepository";
import { prisma } from "@/infra/db/prisma";
import { Device } from "@/domain/entities/Device";
import { DeviceState } from "@/domain/enums/DeviceState";
import { randomUUID } from "crypto";

describe("PrismaDeviceRepository", () => {
  const repository = new PrismaDeviceRepository();

  const createTestDevice = () =>
    new Device({
      id: randomUUID(),
      name: "Test Device",
      brand: "Test Brand",
      state: DeviceState.AVAILABLE,
      createdAt: new Date()
    });

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.device.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a device", async () => {
    const device = createTestDevice();

    await repository.create(device);

    const saved = await prisma.device.findUnique({ where: { id: device.id } });
    expect(saved).not.toBeNull();
    expect(saved?.name).toBe(device.name);
  });

  it("should update a device", async () => {
    const device = createTestDevice();
    await repository.create(device);

    device.name = "Updated Name";
    await repository.update(device);

    const updated = await prisma.device.findUnique({ where: { id: device.id } });
    expect(updated?.name).toBe("Updated Name");
  });

  it("should delete a device", async () => {
    const device = createTestDevice();
    await repository.create(device);

    await repository.delete(device.id);

    const deleted = await prisma.device.findUnique({ where: { id: device.id } });
    expect(deleted).toBeNull();
  });

  it("should find a device by id", async () => {
    const device = createTestDevice();
    await repository.create(device);

    const found = await repository.findById(device.id);
    expect(found).not.toBeNull();
    expect(found?.name).toBe(device.name);
  });

  it("should return null if device not found by id", async () => {
    const found = await repository.findById(randomUUID());
    expect(found).toBeNull();
  });

  it("should find all devices", async () => {
    await repository.create(createTestDevice());
    await repository.create(createTestDevice());

    const all = await repository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it("should find devices by brand", async () => {
    const device = createTestDevice();
    device.brand = "UniqueBrand";
    await repository.create(device);

    const found = await repository.findByBrand("UniqueBrand");
    expect(found.length).toBeGreaterThanOrEqual(1);
    expect(found[0].brand).toBe("UniqueBrand");
  });

  it("should find devices by state", async () => {
    const device = createTestDevice();
    device.state = DeviceState.IN_USE;
    await repository.create(device);

    const found = await repository.findByState(DeviceState.IN_USE);
    expect(found.length).toBeGreaterThanOrEqual(1);
    expect(found[0].state).toBe(DeviceState.IN_USE);
  });
});
