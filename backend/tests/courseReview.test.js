import request from 'supertest';
import CourseReview from '../src/models/CourseReview.js';
import app from '../src/app.js';
import { tokens, courseOne, setupDatabase, dropDb } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);
afterAll(dropDb);

it('Should add a review with valid data', async () => {
  const count = await CourseReview.countDocuments();
  const review = { rate: 5, comment: 'test' };

  const response = await request(app)
    .post(`/api/courses/${courseOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  expect(response.body.data).not.toBeNull();
  expect(await CourseReview.countDocuments()).toBe(count + 1);
});

it('Should not add a review with invalid data', async () => {
  const count = await CourseReview.countDocuments();
  const review = { rate: 0, comment: 'test' };

  await request(app)
    .post(`/api/courses/${courseOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);

  expect(await CourseReview.countDocuments()).toBe(count);
});

it('Should not allow to review same course more than once', async () => {
  const count = await CourseReview.countDocuments();
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/courses/${courseOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(400);

  expect(await CourseReview.countDocuments()).toBe(count);
});

it('Should allow many users to review same course', async () => {
  const count = await CourseReview.countDocuments();
  const review = { rate: 5, comment: 'test' };

  await request(app)
    .post(`/api/courses/${courseOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  await request(app)
    .post(`/api/courses/${courseOne._id}/reviews`)
    .send(review)
    .set('Cookie', [`token=${tokens[2]}`])
    .expect(200);

  expect(await CourseReview.countDocuments()).toBe(count + 2);
});

it('Should get reviews', async () => {
  const response = await request(app)
    .get(`/api/courses/${courseOne._id}/reviews`)
    .send()
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

it('Should delete a reviews', async () => {
  const count = await CourseReview.countDocuments();

  await request(app)
    .delete(`/api/courses/${courseOne._id}/reviews`)
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await CourseReview.countDocuments()).toBe(count - 1);
});
