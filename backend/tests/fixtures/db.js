/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import User from '../../src/models/User.js';
import Course from '../../src/models/Course.js';
import Review from '../../src/models/Review.js';
import UserReview from '../../src/models/UserReview.js';
import CourseReview from '../../src/models/CourseReview.js';
import Conversation from '../../src/models/Conversation.js';

const userReviewOneId = new mongoose.Types.ObjectId();

const courseOneId = new mongoose.Types.ObjectId();

const userOneId = new mongoose.Types.ObjectId();

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
  reviews: [userReviewOneId],
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

const userFiveId = new mongoose.Types.ObjectId();

const userFive = {
  _id: userFiveId,
  email: 'test5@gmail.com',
  password: '12345678',
  fName: 'testUser',
  lName: '55',
  gender: 'Male',
  location: 'Europe',
  birthday: new Date(),
  wishlist: [courseOneId],
};

// create courses

const courseReviewOneId = new mongoose.Types.ObjectId();

const courseOne = {
  _id: courseOneId,
  title: 'Lose weight',
  description: 'The fastest way to lose weight',
  address: 'kt2 6qw',
  creators: [userTwoId, userOneId],
  price: 10,
  tags: ['GetFit', 'FitFam'],
  reviews: [courseReviewOneId],
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
const conversationOneId = new mongoose.Types.ObjectId();
const conversationOne = {
  _id: conversationOneId,
  users: [userOne._id],
};

const conversationTwoId = new mongoose.Types.ObjectId();
const conversationTwo = {
  _id: conversationTwoId,
  users: [userTwo._id, userThree._id],
  messages: [],
};

// create reviews

const userReviewOne = {
  kind: 'UserReview',
  _id: userReviewOneId,
  author: userTwoId,
  rate: 5,
  comment: 'userReviewOne',
  user: userOneId,
};

const courseReviewOne = {
  kind: 'CourseReview',
  _id: courseReviewOneId,
  author: userTwoId,
  rate: 5,
  comment: 'courseReviewOne',
  course: courseOneId,
};

// create fixtures

const reviews = [userReviewOne, courseReviewOne];
const users = [userOne, userTwo, userThree, userFour, userFive];
const courses = [courseOne, courseTwo];
const conversations = [conversationOne, conversationTwo];

// token
const tokens = [];

const setupDatabase = async () => {
  await User.deleteMany();
  await Review.deleteMany();
  await Course.deleteMany();
  await Conversation.deleteMany();
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

  await Review.create(reviews);

  // eslint-disable-next-line no-restricted-syntax
  for (const conv of conversations) {
    const newConv = new Conversation(conv);
    // eslint-disable-next-line no-await-in-loop
    await newConv.save();
  }
};

export {
  userOne,
  userTwo,
  userThree,
  userFour,
  userFive,
  courseOne,
  courseTwo,
  setupDatabase,
  userOneId,
  tokens,
  conversationOne,
  conversationTwo,
};
