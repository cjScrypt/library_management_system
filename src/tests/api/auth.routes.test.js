const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");

describe("", () => {
    describe("POST /auth/signup: Test Signup", () => {
        it("Should successfully register a new user", async (done) => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ username: "newuser1", password: "2;j}6eEy"});

            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property("message");
        });

        it("Should not register a user when a user with same username exists", async (done) => {
            const response = await request(app)
                .post("/auth/signup")
                .send({ username: "newuser1", password: "3,sGap#'5"});
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
        });
    });
});