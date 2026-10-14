import request from "supertest"
import app from "../src/app.js"

describe("Auth",()=>{
    test("shoud reject access without atoken",async()=>{
        const response = await request(app).post("/api/courses")
        expect(response.status).toBe(401)
    })
})