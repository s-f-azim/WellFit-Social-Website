import mongoose from "mongoose";
import User from "../../src/models/User.js";

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  email: "test@test.com",
  password: "password@12",
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  email: "test2@test.com",
  password: "password@123",
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
