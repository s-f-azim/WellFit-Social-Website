import mongoose from "mongoose";
import User from "../../src/models/User.js";

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  email: "testEmail@test.com",
  password: "12345678",
  name: "testUser1",
  gender: "Male",
  location: "Africa",
  age: 69,
  nickname: "testicles",
  bio: "I have no balls",
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  email: "test2@test.com",
  password: "password@123",
  name: "testUser2",
  gender: "Female",
  location: "Europe",
  age: 18,
  nickname: "Notesticles",
  bio: "I have many balls",
};

const users = [userOne, userTwo];

const setupDatabase = async () => {
  await User.deleteMany();
  // seed users
  for (let u of users) {
    const user = new User(u);
    await user.save();
  }
};

export { userOne, userTwo, setupDatabase, userOneId };
