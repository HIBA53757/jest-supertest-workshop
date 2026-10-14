import request from "supertest"
import mongoose from "mongoose";
import { connectDB } from "../src/config/database.js";
import app from "../src/app.js"

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe("Auth", () => {
    it("should register a new learner", async () => {
        const user = {
            name: "test2",
            email: "test2@gmail.com",
            password: "password123",
        };

        const response = await request(app)
            .post("/api/auth/register")
            .send(user);

     
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.role).toBe("learner");
    });
});