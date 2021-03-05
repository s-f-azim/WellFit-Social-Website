import request from 'supertest';
import User from '../src/models/User.js';
import app from '../src/app.js';
import { tokens, userOne, userTwo, setupDatabase } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

// assert signup with valid data
it('Should signup a new user', async () => {
  const count = await User.countDocuments();
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'testEmail1@test.com', password: '12345678', name: 'test' })
    .expect(201);
  // assert that the database was changed correctly
  const user = await User.findById(response.body.data._id);
  expect(user).not.toBeNull;
  expect(await User.countDocuments()).toBe(count + 1);
});
// assert signup with invalid data (duplicate email)
it('Should not signup a new user', async () => {
  const count = await User.countDocuments();
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testEmail@test.com',
      password: 'password12@',
      name: 'testUser1',
    })
    .expect(400);
  expect(await User.countDocuments()).toBe(count);
});

// assert user login with valid data
it('Should login user', async () => {
  await request(app).post('/api/users/login').send(userOne).expect(200);
});

// assert user login with invalid data
it('Should login user', async () => {
  await request(app).post('/api/users/login').expect(404);
});

// assert logout of a user
it('Should logout a user', async () => {
  await request(app).post('/api/users/login').send(userOne).expect(200);
  await request(app).get('/api/users/logout').expect(200);
});

// assert non logged in user cant edit their information
it('Should not  edit profile when not logged in', async () => {
  await request(app).patch('/api/users/editProfile').send().expect(401);
});
// assert only logged in user can edit their information
it('Should not edit profile when not logged in', async () => {
  await request(app)
    .patch('/api/users/editProfile')
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
});
// assert update a user attribute
it('Should update a user\'s valid attribute', async () => {
  await request(app)
    .patch('/api/users/editProfile')
    .send({ email: 'testtttttttt@test.com' })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.email).toBe('testtttttttt@test.com');
});

// assert update a user attribute
it('Should not update a user\'s invalid attribute', async () => {
  await request(app)
    .patch('/api/users/editProfile')
    .send({ size: 'large' })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.size).toEqual(undefined);
});

const countReviews = async (userId) => {
  const result = await User.aggregate([
    { $match: { _id: userId } },
    { $project: { _id: 0, count: { $size: '$reviews' } } },
  ]);
  return result[0].count;
};

it('Should add a review with valid data', async () => {
  const count = await countReviews(userTwo._id);
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/reviews/${userTwo._id}`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  expect(await countReviews(userTwo._id)).toBe(count + 1);
});

it('Should not add a review with invalid data', async () => {
  const count = await countReviews(userTwo._id);
  const review = { rate: -1, comment: 'test' };

  await request(app)
    .post(`/api/users/reviews/${userTwo._id}`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);

  expect(await countReviews(userTwo._id)).toBe(count);
});

it('Should not allow users to review themselves', async () => {
  const count = await countReviews(userOne._id);
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/reviews/${userOne._id}`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);

  expect(await countReviews(userOne._id)).toBe(count);
});

it('Should not allow to review same user more than once', async () => {
  const count = await countReviews(userOne._id);
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/reviews/${userOne._id}`)
    .send(review)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(400);

  expect(await countReviews(userOne._id)).toBe(count);
});

it('Should get reviews', async () => {
  const response = await request(app)
    .get(`/api/users/reviews/${userOne._id}`)
    .send()
    .expect(200);

  expect(response.body.data.reviews).not.toBeNull();
});

it('Should delete a reviews', async () => {
  const count = await countReviews(userOne._id);

  await request(app)
    .delete(`/api/users/reviews/${userOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await countReviews(userOne._id)).toBe(count - 1);
});
