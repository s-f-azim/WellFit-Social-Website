import User from "../src/models/User";
import app from "../src/app";
import request from "supertest";
import { userOne, setupDatabase } from "./fixtures/db.js";

// setup db for each test
beforeEach(setupDatabase);

// assert signup with valid data
it("Should signup a new user", async () => {
  const count = await User.countDocuments();
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "testEmail1@test.com", password: "12345678", name: "test" })
    .expect(201);
  //assert that the database was changed correctly
  const user = await User.findById(response.body.data._id);
  expect(user).not.toBeNull;
  expect(await User.countDocuments()).toBe(count + 1);
});
// assert signup with invalid data (duplicate email)
it("Should not signup a new user", async () => {
  const count = await User.countDocuments();
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "testEmail@test.com", password: "password12@", name: "testUser1" })
    .expect(400);
});

// assert user login with valid data
it("Should login user", async () => {
  const response = await request(app)
    .post("/api/users/login")
    .send(userOne)
    .expect(200);
});

// assert user login with invalid data
it("Should login user", async () => {
  const response = await request(app).post("/api/users/login").expect(404);
});

// assert logout of a user
it("Should logout a user", async () => {
  const response = await request(app)
    .post("/api/users/login")
    .send(userOne)
    .expect(200);
  const lougout = await request(app).get("/api/users/logout").expect(200);
});
