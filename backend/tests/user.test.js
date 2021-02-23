import User from "../src/models/User";
import app from "../src/app";
import request from "supertest";
import { tokenOne, userOne, userTwo, setupDatabase } from "./fixtures/db.js";

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
    .send({
      email: "testEmail@test.com",
      password: "password12@",
      name: "testUser1",
    })
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
  const logout = await request(app).get("/api/users/logout").expect(200);
});

// assert non logged in user cant edit their information
it("Should not  edit profile when not logged in", async () => {
  const response = await request(app)
    .patch("/api/users/editProfile")
    .send()
    .expect(401);
});
// assert only logged in user can edit their information
it("Should not edit profile when not logged in", async () => {
  const response = await request(app)
    .patch("/api/users/editProfile")
    .send()
    .set("Cookie", [`token=${tokenOne}`])
    .expect(200);
});
// assert update a user attribute
it("Should update a user's attribute", async () => {
  const response = await request(app)
    .patch("/api/users/editProfile")
    .send(userOne)
    .set("Cookie", [`token=${tokenOne}`])
    .expect(200);
});

// assert does not allow to update a user attribute
it("Should not update a user's attribute", async () => {
  const response = await request(app)
    .patch("/api/users/editProfile")
    .send(userTwo)
    .set("Cookie", [`token=${tokenOne}`])
    .expect(401);
});
