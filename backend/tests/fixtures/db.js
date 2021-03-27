/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import User from '../../src/models/User.js';
import Course from '../../src/models/Course.js';
import Review from '../../src/models/Review.js';
import UserReview from '../../src/models/UserReview.js';
import CourseReview from '../../src/models/CourseReview.js';
import Request from '../../src/models/Request.js';
import Conversation from '../../src/models/Conversation.js';
import Post from '../../src/models/Post.js';

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
  tags: ['Sweat', 'Cardio'],
  clientGenderPreference: 'Female',
  verified: false,
  role: 'client',
  isBanned: 'false',
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
  verified: false,
  role: 'instructor',
  following: [userOneId],
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
  verified: false,
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
  verified: false,
  role: 'instructor',
};

const userFiveId = new mongoose.Types.ObjectId();

const userFive = {
  _id: userFiveId,
  email: 'test5@test.com',
  password: 'password123',
  fName: 'testUser',
  lName: '55',
  location: 'Europe',
  birthday: new Date(),
  nickname: 'RPE10single',
  bio: 'I powerlift ur mom',
  wishlist: [courseOneId],
  verified: false,
  tags: ['Workout', 'Sweat'],
  gender: 'Male',
  role: 'admin',
};

// create Instructors
const instructorOneId = new mongoose.Types.ObjectId();

const instructorOne = {
  _id: instructorOneId,
  email: 'testEmail32@test.com',
  password: '12345678',
  fName: 'Alex',
  lName: 'Test2',
  gender: 'Male',
  birthday: new Date(2001, 2, 23),
  nickname: 'testicles',
  bio: 'I have no balls',
  role: 'instructor',
  tags: ['Cardio'],
};

const instructorTwoId = new mongoose.Types.ObjectId();

const instructorTwo = {
  _id: instructorTwoId,
  email: 'test20@test.com',
  password: 'password@123',
  fName: 'Dave',
  lName: 'Test2',
  gender: 'Female',
  birthday: new Date(1948, 2, 23),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  role: 'instructor',
};

const instructorThreeId = new mongoose.Types.ObjectId();

const instructorThree = {
  _id: instructorThreeId,
  email: 'test6@test.com',
  password: '12345678',
  fName: 'Emilia',
  lName: 'Test2',
  gender: 'Non-Binary',
  birthday: new Date(2000, 9, 20),
  nickname: 'testicles',
  bio: 'I have no balls',
  role: 'instructor',
  tags: ['Cycling', 'Sweat'],
};

const instructorFourId = new mongoose.Types.ObjectId();

const instructorFour = {
  _id: instructorFourId,
  email: 'test7@test.com',
  password: 'password@123',
  fName: 'Mandela',
  lName: 'Test2',
  gender: 'Female',
  birthday: new Date(1976, 2, 25),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  role: 'instructor',
  tags: ['Cycling'],
};

const instructorFiveId = new mongoose.Types.ObjectId();

const instructorFive = {
  _id: instructorFiveId,
  email: 'test8@test.com',
  password: '12345678',
  fName: 'Anna',
  lName: 'Test2',
  gender: 'Female',
  birthday: new Date(1988, 2, 25),
  nickname: 'testicles',
  bio: 'I have no balls',
  role: 'instructor',
};

const instructorSixId = new mongoose.Types.ObjectId();

const instructorSix = {
  _id: instructorSixId,
  email: 'test71@test.com',
  password: 'password@123',
  fName: 'Kate',
  lName: 'Test2',
  gender: 'Female',
  birthday: new Date(1987, 2, 25),
  nickname: 'Notesticles',
  bio: 'I have many balls',
  role: 'instructor',
};

// create courses

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
  trainingEquipment: ['treadmill'],
};

const courseThreeId = new mongoose.Types.ObjectId();

const courseThree = {
  _id: courseThreeId,
  title: 'Course 3',
  description: 'lose your weight today',
  address: 'E20 1GS',
  creators: [userFiveId],
  price: 0,
  tags: ['Cardio', 'FitFam'],
};

const courseFourId = new mongoose.Types.ObjectId();

const courseFour = {
  _id: courseFourId,
  title: 'Course 4',
  description: 'lose your weight today',
  address: 'E20 1GS',
  creators: [userFourId],
  price: 0,
  tags: ['Cardio', 'FitFam'],
  trainingEquipment: ['treadmill'],
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

const userReviewOneId = new mongoose.Types.ObjectId();

const userReviewOne = {
  kind: 'UserReview',
  _id: userReviewOneId,
  author: userTwoId,
  rate: 5,
  comment: 'userReviewOne',
  user: userOneId,
};

const courseReviewOneId = new mongoose.Types.ObjectId();

const courseReviewOne = {
  kind: 'CourseReview',
  _id: courseReviewOneId,
  author: userTwoId,
  rate: 5,
  comment: 'courseReviewOne',
  course: courseOneId,
};

// create posts

const postOneId = new mongoose.Types.ObjectId();

const postOne = {
  _id: postOneId,
  author: userOneId,
  content: 'postOne',
  youtubelink: 'postOne',
};

const postTwoId = new mongoose.Types.ObjectId();

const postTwo = {
  _id: postTwoId,
  author: userOneId,
  content: 'postTwo',
  youtubelink: 'postTwo',
};

// create fixtures

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
  recipient: userTwoId,
  type: 'report',
  content: 'user report #1',
};

const reviews = [userReviewOne, courseReviewOne];
const users = [userOne, userTwo, userThree, userFour, userFive];
const instructors = [
  instructorOne,
  instructorTwo,
  instructorThree,
  instructorFour,
  instructorFive,
  instructorSix,
];
const courses = [courseOne, courseTwo, courseThree, courseFour];
const requests = [requestOne, requestTwo, requestThree, requestFour];
const conversations = [conversationOne, conversationTwo];
const posts = [postOne, postTwo];

// token
const tokens = [];

const setupDatabase = async () => {
  await User.deleteMany();
  await Review.deleteMany();
  await Course.deleteMany();
  await Request.deleteMany();
  await Conversation.deleteMany();
  await Post.deleteMany();

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

  await Post.create(posts);

  // eslint-disable-next-line no-restricted-syntax
  for (const r of requests) {
    const request = new Request(r);
    // eslint-disable-next-line no-await-in-loop
    await request.save();
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const conv of conversations) {
    const newConv = new Conversation(conv);
    // eslint-disable-next-line no-await-in-loop
    await newConv.save();
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
  userFour,
  userFive,
  requestOne,
  requestTwo,
  requestThree,
  requestFour,
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
  userTwoId,
  userFiveId,
  tokens,
  conversationOne,
  conversationTwo,
  postOne,
};
