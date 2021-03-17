import request from 'supertest';
import Request from '../src/models/Request.js';
import app from '../src/app.js';
import {
  tokens,
  userOne,
  userTwo,
  userThree,
  requestOne,
  requestTwo,
  requestThree,
  requestFour,
  setupDatabase,
} from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

it('Should create a request with valid data', async () => {
  const count = await Request.countDocuments();
  const report = { author: userOne, type: 'bug', content: 'bug report' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 1);
});

it('Should not submit empty request', async () => {
  const count = await Request.countDocuments();
  const report = { author: userOne, type: 'bug', content: '' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report)
    .expect(400);

  expect(await Request.countDocuments()).toBe(count);
});

it('Should not submit requests of forbidden types', async () => {
  const count = await Request.countDocuments();
  const report = { author: userOne, type: 'bag', content: '' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report)
    .expect(400);

  expect(await Request.countDocuments()).toBe(count);
});

it('Should be able to create a request of any type', async () => {
  const count = await Request.countDocuments();

  const report1 = { author: userOne, type: 'bug', content: 'bug report' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report1)
    .expect(200);

  const report2 = { author: userOne, type: 'verify', content: 'verify req' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report2)
    .expect(200);

  const report3 = {
    author: userOne,
    type: 'message',
    content: 'message to admin',
  };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report3)
    .expect(200);

  /* Recipient is for report reqs only, which is WIP
  
  const report4 = {
    author: userOne,
    type: 'report',
    recipient: userTwo._id,
    content: 'user report',
  };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report4)
    .expect(200); */

  expect(await Request.countDocuments()).toBe(count + 3);
});

it('Should allow user to submit a req of same type more than once', async () => {
  const count = await Request.countDocuments();
  const report1 = { author: userOne, type: 'bug', content: 'bug report' };
  const report2 = { author: userOne, type: 'bug', content: 'bug report again' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[1]}`])
    .send(report1)
    .expect(200);

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[1]}`])
    .send(report2)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 2);
});

it('Should allow two users to submit identical requests', async () => {
  const count = await Request.countDocuments();
  const report1 = { author: userOne, type: 'bug', content: 'bug report' };
  const report2 = { author: userTwo, type: 'bug', content: 'bug report' };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report1)
    .expect(200);

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[1]}`])
    .send(report2)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 2);
});

it('Should get requests', async () => {
  const response = await request(app).get('/api/requests').send().expect(200);

  expect(response.body.data.requests).not.toBeNull();
});

it('Should delete a request', async () => {
  const count = await Request.countDocuments();

  await request(app)
    .delete(`/api/requests/delete/${requestOne._id}`)
    .set('Cookie', [`token=${tokens[0]}`])
    .send()
    .expect(200);

  expect(await Request.countDocuments()).toBe(count - 1);
});
