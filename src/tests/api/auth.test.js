const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");

const { users } = require("../sampleData");
const app = require("../../app");
const { clearAllSchemas } = require("../../utils");
const { UserRepository } = require("../../database/repository");

describe("==== Authentication Test ====", () => {
    const userRepo = new UserRepository();
    const user1 = users[0];

    before(async () => {
        await clearAllSchemas();
    });

    describe("POST /auth/signup: Test Signup", () => {

        after(async () => {
            await userRepo.deleteUser({ username: user1.username });
        });

        it("Should successfully register a new user", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ username: user1.username, password: user1.password });

            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property("message");

            return response;
        });

        it("Should not register a user when a user with same username exists", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ username: user1.username, password: user1.password });
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
        });
    });

    describe("POST /auth/login: Test Login", () => {
        before(async () => {
            await userRepo.createUser(user1);
        });

        after(async () => {
            await userRepo.deleteUser({ username: user1.username });
        });

        it("Should successfully authenticte a user with valid credentials", async () => {
            const response = await request(app)
                .post("/auth/login")
                .send({ username: user1.username, password: user1.password });

            expect(response.status).to.equal(200);
        });

    });
});