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
  tags: ['#Sweat', '#Cardio'],
  clientGenderPreference: 'Female',
  role: 'client'
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
  tags: ['#Sweat'],
  role: 'instructor'
};

const userThreeId = new mongoose.Types.ObjectId();

const userThree = {
  _id: userThreeId,
  email: 'test3@test.com',
  password: 'password123',
  name: 'testUser3',
  gender: 'Male',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'FitnessGuru',
  bio: 'I love fitness',
  tags: ['#Sweat'],
  role: 'instructor'
};

const userFourId = new mongoose.Types.ObjectId();

const userFour = {
  _id: userFourId,
  email: 'test4@test.com',
  password: 'password123',
  name: 'testUser4',
  gender: 'Male',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'FitnessGeeza',
  bio: 'I dont mind fitness',
  tags: ['#Workout', '#Sweat'],
  role: 'instructor'
};

const users = [userOne, userTwo, userThree, userFour];
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

export { userOne, userTwo, setupDatabase, userOneId, tokens };
