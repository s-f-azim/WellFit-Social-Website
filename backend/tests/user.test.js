import User from "../src/models/User";
import app from "../src/app";
import request from "supertest";
import { tokens, userOne, userTwo, setupDatabase } from "./fixtures/db.js";
//import { it } from "date-fns/locale";

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
    .set("Cookie", [`token=${tokens[0]}`])
    .expect(200);
});
// assert update a user attribute
it("Should update a user's valid attribute", async () => {
  const response = await request(app)
    .patch("/api/users/editProfile")
    .send({ email: "testtttttttt@test.com" })
    .set("Cookie", [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.email).toBe("testtttttttt@test.com");
});

// assert update a user attribute
it("Should not update a user's invalid attribute", async () => {
  const response = await request(app)
    .patch("/api/users/editProfile")
    .send({ size: "large" })
    .set("Cookie", [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.size).toEqual(undefined);
});

// assert delete a user
it("Should delete a logged in user", async () => {
  const response = await request(app)
    .delete("/api/users/delete")
    .send()
    .set("Cookie", [`token=${tokens[0]}`])
    .expect(200);
  const userExists = await User.exists({_id: userOne._id});
  expect(userExists).toEqual(false);
}); 
