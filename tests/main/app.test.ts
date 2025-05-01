import request from "supertest";
import { app } from "@/main/app";

describe("App", () => {
  it("should return 200 and ok status on /health", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
