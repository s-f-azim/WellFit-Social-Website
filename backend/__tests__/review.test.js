import request from 'supertest';
import Review from '../src/models/Review.js';
import app from '../src/app.js';
import {
  tokens,
  userOne,
  userTwo,
  userThree,
  setupDatabase,
} from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

it('Should add a review with valid data', async () => {
  const count = await Review.countDocuments();
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/${userTwo._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  expect(await Review.countDocuments()).toBe(count + 1);
});

it('Should not add a review with invalid data', async () => {
  const count = await Review.countDocuments();
  const review = { rate: 0, comment: 'test' };

  await request(app)
    .post(`/api/users/${userTwo._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);

  expect(await Review.countDocuments()).toBe(count);
});

it('Should not allow users to review themselves', async () => {
  const count = await Review.countDocuments();
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/${userOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);

  expect(await Review.countDocuments()).toBe(count);
});

it('Should not allow to review same user more than once', async () => {
  const count = await Review.countDocuments();
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/${userOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(400);

  expect(await Review.countDocuments()).toBe(count);
});

it('Should allow many users to review same user', async () => {
  const count = await Review.countDocuments();
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/users/${userThree._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  await request(app)
    .post(`/api/users/${userThree._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await Review.countDocuments()).toBe(count + 2);
});

it('Should get reviews', async () => {
  const response = await request(app)
    .get(`/api/users/${userOne._id}/reviews`)
    .send()
    .expect(200);

  expect(response.body.data.reviews).not.toBeNull();
});

it('Should delete a reviews', async () => {
  const count = await Review.countDocuments();

  await request(app)
    .delete(`/api/users/${userOne._id}/reviews`)
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await Review.countDocuments()).toBe(count - 1);
});
