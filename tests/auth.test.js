import request from "supertest";
import app from "../app.js";
import { users } from "../utils/users.js";

beforeEach(() => {
  users.length = 0; 
});

describe("Auth API", () => {
  test("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered");
  });

  test("should not register with duplicate email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already registered");
  });

  test("should login with correct credentials", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("should reject login with wrong password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrong" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});

