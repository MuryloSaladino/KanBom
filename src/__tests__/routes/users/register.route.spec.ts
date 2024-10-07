import request from "supertest"
import app from "../../../app";
import payloads from "../../payloads/users/register.payloads";

describe("User Register Route", () => {
    

    test("Should register a new user in the system", async () => {
        const response = await request(app).post("/api/users").send(payloads.success);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            email: payloads.success.email,
            details: expect.objectContaining({
                birthdate: payloads.success.birthdate,
                firstName: payloads.success.firstName,
                lastName: payloads.success.lastName,
                profilePicture: payloads.success.profilePicture
            })
        }));
        expect(response.body).not.toHaveProperty("password")
    });

    test("Should return 400 with error message", async () => {
        const response = await request(app).post("/api/users").send(payloads.invalidBody);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
});