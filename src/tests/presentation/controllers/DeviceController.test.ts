import request from "supertest";
import { app } from "@/main/app";
import { prisma } from "@/infra/db/prisma";

describe("DeviceController error paths", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.device.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return 400 if update is called with invalid UUID", async () => {
    const response = await request(app)
      .patch("/devices/invalid-uuid")
      .send({ name: "New name" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return 400 if delete is called with invalid UUID", async () => {
    const response = await request(app)
      .delete("/devices/invalid-uuid");

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return 400 if findById is called with invalid UUID", async () => {
    const response = await request(app)
      .get("/devices/invalid-uuid");

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
