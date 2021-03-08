import mongoose from 'mongoose';
import User from '../../src/models/User.js';
import Review from '../../src/models/Review.js';

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();

const reviewOneId = new mongoose.Types.ObjectId();

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
  reviews: [reviewOneId],
};

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

const userThree = {
  _id: userThreeId,
  email: 'test3@test.com',
  password: 'password@123',
  name: 'testUser3',
  gender: 'Female',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'Notesticles',
  bio: 'I have many balls',
};

const reviewOne = {
  _id: reviewOneId,
  reviewed: userOneId,
  reviewer: userTwoId,
  rate: 5,
  comment: 'reviewOne',
};

const users = [userOne, userTwo, userThree];
const reviews = [reviewOne];
// token
const tokens = [];
const setupDatabase = async () => {
  await User.deleteMany();
  await Review.deleteMany();

  // seed users

  // eslint-disable-next-line no-restricted-syntax
  for (const u of users) {
    const user = new User(u);
    // eslint-disable-next-line no-await-in-loop
    await user.save();
    tokens.push(user.getSginedJWTToken());
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const r of reviews) {
    const review = new Review(r);
    // eslint-disable-next-line no-await-in-loop
    await review.save();
  }
};

export { userOne, userTwo, userThree, setupDatabase, userOneId, tokens };
