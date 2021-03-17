import request from 'supertest';
import Request from '../src/models/Review.js';
import app from '../src/app.js';
import {
  tokens,
  userOne,
  userTwo,
  userThree,
  requestOne,
  setupDatabase,
} from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

it('Should create a request with valid data', async () => {
  const count = await Request.countDocuments();
  const report = { author: userOne, type: 'bug', content: 'bug report' };

  await request(app).post('/api/requests/create').send(report).expect(200);

  expect(await Request.countDocuments()).toBe(count + 1);
});

it('Should not submit empty request', async () => {
  const count = await Request.countDocuments();
  const report = { author: userOne, type: 'bug', content: '' };

  await request(app)
    .post(`/api/users/${userTwo._id}/reviews`)
    .post('/api/requests/create')
    .send(report)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count);
});

it('Should not submit requests of forbidden types', async () => {
  const count = await Request.countDocuments();
  const report = { author: userOne, type: 'bag', content: '' };

  await request(app)
    .post(`/api/users/${userTwo._id}/reviews`)
    .post('/api/requests/create')
    .send(report)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count);
});

it('Should be able to create a request of any type', async () => {
  const count = await Request.countDocuments();
  const report1 = { author: userOne, type: 'bug', content: 'bug report' };
  const report2 = { author: userOne, type: 'verify', content: 'verify req' };
  const report3 = {
    author: userOne,
    type: 'message',
    content: 'message to admin',
  };
  const report4 = { author: userOne, type: 'report', content: 'user report' };

  await request(app).post('/api/requests/create').send(report1).expect(200);
  await request(app).post('/api/requests/create').send(report2).expect(200);
  await request(app).post('/api/requests/create').send(report3).expect(200);
  await request(app).post('/api/requests/create').send(report4).expect(200);

  expect(await Request.countDocuments()).toBe(count + 4);
});

it('Should allow user to submit a req of same type more than once', async () => {
  const count = await Request.countDocuments();
  const report1 = { author: userOne, type: 'bug', content: 'bug report' };
  const report2 = { author: userOne, type: 'bug', content: 'bug report again' };

  await request(app)
    .post('/api/requests/create')
    .send(report1)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  await request(app)
    .post('/api/requests/create')
    .send(report2)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 2);
});

it('Should allow two users to submit indetical requests', async () => {
  const count = await Request.countDocuments();
  const report1 = { author: userOne, type: 'bug', content: 'bug report' };
  const report2 = { author: userOne, type: 'bug', content: 'bug report' };

  await request(app)
    .post('/api/requests/create')
    .send(report1)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  await request(app)
    .post('/api/requests/create')
    .send(report2)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 2);
});

it('Should get requests', async () => {
  const response = await request(app).get('/api/requests').send().expect(200);

  expect(response.body.data.reviews).not.toBeNull();
});

it('Should delete a request', async () => {
  const count = await Request.countDocuments();

  await request(app)
    .delete(`/api/requests/delete/:${requestOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(await Request.countDocuments()).toBe(count - 1);
});
