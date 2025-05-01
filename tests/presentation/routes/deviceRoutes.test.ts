import request from "supertest";
import { app } from "@/main/app";
import { prisma } from "@/infra/db/prisma";
import { randomUUID } from "crypto";

describe("Device Routes (integration)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.device.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a device with valid data", async () => {
    const response = await request(app).post("/devices").send({
      name: "My Device",
      brand: "My Brand",
      state: "available"
    });

    expect(response.status).toBe(201);
  });

  it("should return 400 if name is missing", async () => {
    const response = await request(app).post("/devices").send({
      brand: "My Brand",
      state: "available"
    });

    expect(response.status).toBe(400);
  });

  it("should return 400 if state is invalid", async () => {
    const response = await request(app).post("/devices").send({
      name: "Device",
      brand: "Brand",
      state: "invalid"
    });

    expect(response.status).toBe(400);
  });

  it("should return an empty array when no devices exist", async () => {
    const response = await request(app).get("/devices");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return all devices", async () => {
    await prisma.device.createMany({
      data: [
        { id: randomUUID(), name: "D1", brand: "B1", state: "available", createdAt: new Date() },
        { id: randomUUID(), name: "D2", brand: "B2", state: "in_use", createdAt: new Date() }
      ]
    });

    const response = await request(app).get("/devices");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should get a device by id", async () => {
    const created = await prisma.device.create({
      data: {
        id: randomUUID(),
        name: "My Device",
        brand: "Brand",
        state: "available",
        createdAt: new Date()
      }
    });

    const response = await request(app).get(`/devices/${created.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "My Device");
  });

  it("should return 400 if device id is invalid format", async () => {
    const response = await request(app).get("/devices/invalid-id");
    expect(response.status).toBe(400);
  });

  it("should return 404 if device is not found", async () => {
    const uuid = randomUUID();
    const response = await request(app).get(`/devices/${uuid}`);
    expect(response.status).toBe(404);
  });

  it("should get devices by brand", async () => {
    await prisma.device.create({
      data: {
        name: "D1",
        brand: "Brand-X",
        state: "available",
        createdAt: new Date(),
        id: randomUUID()
      }
    });

    const response = await request(app).get("/devices/brand/Brand-X");

    expect(response.status).toBe(200);
    expect(response.body[0].brand).toBe("Brand-X");
  });

  it("should get devices by state", async () => {
    await prisma.device.create({
      data: {
        name: "D2",
        brand: "Brand-Y",
        state: "in_use",
        createdAt: new Date(),
        id: randomUUID()
      }
    });

    const response = await request(app).get("/devices/state/in-use");

    expect(response.status).toBe(200);
    expect(response.body[0].state).toBe("in-use");
  });

  it("should update a device", async () => {
    const created = await prisma.device.create({
      data: {
        name: "ToUpdate",
        brand: "BrandA",
        state: "available",
        createdAt: new Date(),
        id: randomUUID()
      }
    });

    const response = await request(app)
      .patch(`/devices/${created.id}`)
      .send({ name: "Updated Name" });

    expect(response.status).toBe(204);

    const updated = await prisma.device.findUnique({ where: { id: created.id } });
    expect(updated?.name).toBe("Updated Name");
  });

  it("should delete a device", async () => {
    const created = await prisma.device.create({
      data: {
        name: "ToDelete",
        brand: "BrandB",
        state: "available",
        createdAt: new Date(),
        id: randomUUID()
      }
    });

    const response = await request(app).delete(`/devices/${created.id}`);

    expect(response.status).toBe(204);

    const deleted = await prisma.device.findUnique({ where: { id: created.id } });
    expect(deleted).toBeNull();
  });

  it("should not delete device in use", async () => {
    const created = await prisma.device.create({
      data: {
        name: "Protected",
        brand: "BrandZ",
        state: "in_use",
        createdAt: new Date(),
        id: randomUUID()
      }
    });

    const response = await request(app).delete(`/devices/${created.id}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("in use");
  });
});
