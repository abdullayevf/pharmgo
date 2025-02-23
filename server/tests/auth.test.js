import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import User from "../models/User.js";

const testUser = {
  username: "testuser",
  email: "testuser@testmail.com",
  password: "testpassword",
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authentication Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send(testUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not register a user with an existing username", async () => {
    const res = await request(app).post("/auth/register").send(testUser);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/auth/login").send(testUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("shouldn't login with wrong credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      username: testUser.username,
      password: "verywrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
});
