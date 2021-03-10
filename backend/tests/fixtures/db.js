import mongoose from 'mongoose';
import User from '../../src/models/User.js';
import Review from '../../src/models/Review.js';
import Course from '../../src/models/Course.js';

const userOneId = new mongoose.Types.ObjectId();
const reviewOneId = new mongoose.Types.ObjectId();

// create users
const userOne = {
  _id: userOneId,
  email: 'testEmail@test.com',
  password: '12345678',
  name: 'testUser1',
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
  name: 'testUser2',
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
  name: 'testUser3',
  gender: 'Male',
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
  name: 'testUser4',
  gender: 'Male',
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

// create Instructors
const instructorOneId = new mongoose.Types.ObjectId();

const instructorOne = {
  _id: instructorOneId,
  email: 'testEmail32@test.com',
  password: '12345678',
  name: 'Alex',
  gender: 'Male',
  birthday: new Date(),
  nickname: 'testicles',
  bio: 'I have no balls',
  role: 'instructor',
  age: 19,
  tags: ['Cardio'],
};

const instructorTwoId = new mongoose.Types.ObjectId();

const instructorTwo = {
  _id: instructorTwoId,
  email: 'test20@test.com',
  password: 'password@123',
  name: 'Dave',
  gender: 'Female',
  birthday: new Date(),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  role: 'instructor',
  age: 73,
};

const instructorThreeId = new mongoose.Types.ObjectId();

const instructorThree = {
  _id: instructorThreeId,
  email: 'test6@test.com',
  password: '12345678',
  name: 'Emilia',
  gender: 'Non-Binary',
  birthday: new Date(),
  nickname: 'testicles',
  bio: 'I have no balls',
  role: 'instructor',
  age: 20,
  tags: ['Cycling', 'Sweat'],
};

const instructorFourId = new mongoose.Types.ObjectId();

const instructorFour = {
  _id: instructorFourId,
  email: 'test7@test.com',
  password: 'password@123',
  name: 'Mandela',
  gender: 'Female',
  birthday: new Date(),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  role: 'instructor',
  age: 45,
  tags: ['Cycling'],
};

const instructorFiveId = new mongoose.Types.ObjectId();

const instructorFive = {
  _id: instructorFiveId,
  email: 'test8@test.com',
  password: '12345678',
  name: 'Anna',
  gender: 'Female',
  birthday: new Date(),
  nickname: 'testicles',
  bio: 'I have no balls',
  role: 'instructor',
  age: 32,
};

const instructorSixId = new mongoose.Types.ObjectId();

const instructorSix = {
  _id: instructorSixId,
  email: 'test71@test.com',
  password: 'password@123',
  name: 'Kate',
  gender: 'Female',
  birthday: new Date(),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  role: 'instructor',
  age: 33,
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

const users = [userOne, userTwo, userThree, userFour];
const instructors = [
  instructorOne,
  instructorTwo,
  instructorThree,
  instructorFour,
  instructorFive,
  instructorSix,
];
const reviews = [reviewOne];
const courses = [courseOne, courseTwo];
// token
const tokens = [];
const setupDatabase = async () => {
  await User.deleteMany();
  await Review.deleteMany();
  await Course.deleteMany();
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
};
const instTokens = [];
const setupInstructors = async () => {
  await User.deleteMany({});
  // eslint-disable-next-line no-restricted-syntax
  for (const i of instructors) {
    const user = new User(i);
    // eslint-disable-next-line no-await-in-loop
    await user.save();
    instTokens.push(user.getSignedJWTToken());
  }
};

export {
  userOne,
  userTwo,
  userThree,
  instructorOne,
  instructorTwo,
  instructorThree,
  instructorFour,
  instructorFive,
  instructorSix,
  courseOne,
  courseTwo,
  setupDatabase,
  setupInstructors,
  userOneId,
  tokens,
};
