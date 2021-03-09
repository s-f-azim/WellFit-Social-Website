import request from 'supertest';
import User from '../src/models/User.js';
import app from '../src/app.js';
import { tokens, userOne, setupDatabase, setupInstructors } from './fixtures/db.js';

// setup db for each test
beforeAll(setupInstructors);

// assert get instructors without filters
it('Should get all instructors', async () => {
    const response = await request(app)
      .get('/api/users/instructors');
    expect(response.body.length).toBe(6);
  });
// assert get instructors with filters set to none
it('Should get all instructors', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&age=&&gender=');
  expect(response.body.length).toBe(6);
});
// assert get instructors with filter q set to x
it('Should get all instructors with x in name', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=x&&age=&&gender=');
  expect(response.body.length).toBe(1);
});
// assert get instructors with filter q set to x and gender to female
it('Should get all instructors with name x and who are female', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=x&&age=&&gender=female');
  expect(response.body.length).toBe(0);
});
// assert get instructors with filter q set to a
it('Should get all with letter a', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=a&&age=&&gender=');
  expect(response.body.length).toBe(6);
});
// assert get instructors with filter gender set to non-binary
it('Should get all non-binary instructors', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&age=&&gender=non-binary');
  expect(response.body.length).toBe(1);
});
// assert get instructors with filter gender = female
it('Should get all female instructors', async () => {
    const response = await request(app)
      .get('/api/users/instructors?gender=female');
    expect(response.body.length).toBe(4);
  });
// assert get all instructors with filter age = 0
it('Should get all instructors', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&gender=&&age=0');
  expect(response.body.length).toBe(6);
});
// assert get all instructors with filter age = 20
it('Should get all instructors ages 15-25', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&gender=&&age=20');
  expect(response.body.length).toBe(2);
});
// assert get all instructors with filter age = 35
it('Should get all instructors ages 30-40', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&gender=&&age=35');
  expect(response.body.length).toBe(2);
});
// assert get all instructors with filter age = 55
it('Should get all instructors age 50-60', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&gender=&&age=55');
  expect(response.body.length).toBe(0);
});
// assert get all instructors with filter age = 70
it('Should get all instructors over 62', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=&&gender=&&age=70');
  expect(response.body.length).toBe(1);
});
// assert get all instructors with filter age = 20, q=a and gender=female
it('Should get all female instructors with a in their name between age 15-25', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=a&&gender=female&&age=20');
  expect(response.body.length).toBe(0);
});
// assert get all instructors with filter age = 30, q=a and gender=female
it('Should get all female instructors with a in their name between age 25-35', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=a&&gender=female&&age=30');
  expect(response.body.length).toBe(2);
});
// assert get all instructors with filter age = 20, q=a and gender=male
it('Should get all male instructors with a in their name between 25-35', async () => {
  const response = await request(app)
    .get('/api/users/instructors?q=a&&gender=male&&age=20');
  expect(response.body.length).toBe(1);
});