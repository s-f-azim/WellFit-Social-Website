import mongoose from 'mongoose';
import User from '../../src/models/User.js';
import Review from '../../src/models/Review.js';
import Course from '../../src/models/Course.js';
import Request from '../../src/models/Request.js';

const userOneId = new mongoose.Types.ObjectId();
const reviewOneId = new mongoose.Types.ObjectId();

// create users
const userOne = {
  _id: userOneId,
  email: 'testEmail@test.com',
  password: '12345678',
  fName: 'testUser',
  lName: '11',
  gender: 'Male',
  birthday: new Date(),
  nickname: 'testicles',
  bio: 'I have no balls',
  reviews: [reviewOneId],
  tags: ['Sweat', 'Cardio'],
  clientGenderPreference: 'Female',
  role: 'client',
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  email: 'test2@test.com',
  password: 'password@123',
  fName: 'testUser',
  lName: '22',
  gender: 'Female',
  birthday: new Date(),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  tags: ['Sweat'],
  role: 'instructor',
};

const userThreeId = new mongoose.Types.ObjectId();

const userThree = {
  _id: userThreeId,
  email: 'test3@test.com',
  password: 'password123',
  fName: 'testUser',
  lName: '33',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'FitnessGuru',
  bio: 'I love fitness',
  tags: ['Sweat'],
  role: 'instructor',
};

const userFourId = new mongoose.Types.ObjectId();

const userFour = {
  _id: userFourId,
  email: 'test4@test.com',
  password: 'password123',
  fName: 'testUser',
  lName: '44',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'FitnessGeeza',
  bio: 'I dont mind fitness',
  tags: ['Workout', 'Sweat'],
  role: 'instructor',
};

const reviewOne = {
  _id: reviewOneId,
  reviewed: userOneId,
  reviewer: userTwoId,
  rate: 5,
  comment: 'reviewOne',
};

// create courses

const courseOneId = new mongoose.Types.ObjectId();

const courseOne = {
  _id: courseOneId,
  title: 'Lose weight',
  description: 'The fastest way to lose weight',
  address: 'kt2 6qw',
  creators: [userTwoId, userOneId],
  price: 10,
  tags: ['GetFit', 'FitFam'],
};

const courseTwoId = new mongoose.Types.ObjectId();

const courseTwo = {
  _id: courseTwoId,
  title: 'Lose it',
  description: 'lose your weight today',
  address: 'E20 1GS',
  creators: [userOneId],
  price: 0,
  tags: ['Cardio'],
};

const requestOneId = new mongoose.Types.ObjectId();
const requestTwoId = new mongoose.Types.ObjectId();
const requestThreeId = new mongoose.Types.ObjectId();
const requestFourId = new mongoose.Types.ObjectId();

// requests
const requestOne = {
  _id: requestOneId,
  author: userOneId,
  type: 'bug',
  content: 'bug report #1',
};

const requestTwo = {
  _id: requestTwoId,
  author: userOneId,
  type: 'verify',
  content: 'verify req #1',
};

const requestThree = {
  _id: requestThreeId,
  author: userOneId,
  type: 'message',
  content: 'message #1',
};

const requestFour = {
  _id: requestFourId,
  author: userOneId,
  recipient: userTwo,
  type: 'report',
  content: 'user report #1',
};

const reviews = [reviewOne];
const users = [userOne, userTwo, userThree, userFour];
const courses = [courseOne, courseTwo];
const requests = [requestOne, requestTwo, requestThree, requestFour];
// token
const tokens = [];
const setupDatabase = async () => {
  await User.deleteMany();
  await Review.deleteMany();
  await Course.deleteMany();
  await Request.deleteMany();
  // seed users

  // eslint-disable-next-line no-restricted-syntax
  for (const u of users) {
    const user = new User(u);
    // eslint-disable-next-line no-await-in-loop
    await user.save();
    tokens.push(user.getSignedJWTToken());
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const c of courses) {
    const course = new Course(c);
    // eslint-disable-next-line no-await-in-loop
    await course.save();
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const r of reviews) {
    const review = new Review(r);
    // eslint-disable-next-line no-await-in-loop
    await review.save();
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const r of requests) {
    const request = new Request(r);
    // eslint-disable-next-line no-await-in-loop
    await request.save();
  }
};

export {
  userOne,
  userTwo,
  userThree,
  requestOne,
  requestTwo,
  requestThree,
  requestFour,
  courseOne,
  courseTwo,
  setupDatabase,
  userOneId,
  tokens,
};
