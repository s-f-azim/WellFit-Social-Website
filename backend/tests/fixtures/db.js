import mongoose from 'mongoose';
import User from '../../src/models/User.js';

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  email: 'testEmail@test.com',
  password: '12345678',
  name: 'testUser1',
  gender: 'Male',
  location: 'Africa',
  birthday: new Date(),
  nickname: 'testicles',
  bio: 'I have no balls',
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  email: 'test2@test.com',
  password: 'password@123',
  name: 'testUser2',
  gender: 'Female',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'Notesticles',
  bio: 'I have many balls',
};

const users = [userOne, userTwo];
// token
const tokens = [];
const setupDatabase = async () => {
  await User.deleteMany();
  // seed users
  // eslint-disable-next-line no-restricted-syntax
  for (const u of users) {
    const user = new User(u);
    // eslint-disable-next-line no-await-in-loop
    await user.save();
    tokens.push(user.getSginedJWTToken());
  }
};

export {
  userOne, userTwo, setupDatabase, userOneId, tokens,
};
