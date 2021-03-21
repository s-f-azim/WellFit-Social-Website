import request from 'supertest';
import Request from '../src/models/Request.js';
import app from '../src/app.js';
import {
  tokens,
  userOne,
  userTwo,
  requestOne,
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

  // Recipient is required for report reqs only

  const report4 = {
    author: userOne,
    type: 'report',
    recipientID: userTwo._id,
    content: 'user report',
  };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report4)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 4);
});

it('Should create a report request with valid data', async () => {
  const count = await Request.countDocuments();
  const report = {
    author: userOne,
    type: 'report',
    content: 'report',
    recipientID: userTwo._id,
  };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report)
    .expect(200);

  expect(await Request.countDocuments()).toBe(count + 1);
});

it('Should not create a report request without recipientID', async () => {
  const count = await Request.countDocuments();
  const report = {
    author: userOne,
    type: 'report',
    content: 'report',
  };

  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report)
    .expect(400);

  expect(await Request.countDocuments()).toBe(count);
});
it('Should not create a report request with invalid recipientID', async () => {
  const count = await Request.countDocuments();
  const report = {
    author: userOne,
    type: 'report',
    content: 'report',
    recipientID: 0,
  };
  const report2 = {
    author: userOne,
    type: 'report',
    content: 'report',
    recipientID: 'dfw2141240',
  };
  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report)
    .expect(400);
  await request(app)
    .post('/api/requests/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send(report2)
    .expect(400);
  expect(await Request.countDocuments()).toBe(count);
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
it('Should allow one user to submit identical report requests', async () => {
  const count = await Request.countDocuments();
  const report1 = {
    author: userOne,
    type: 'report',
    recipientID: userTwo._id,
    content: 'report report',
  };
  const report2 = {
    author: userOne,
    type: 'report',
    recipientID: userTwo._id,
    content: 'report report',
  };

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
it('Should not delete a request', async () => {
  const count = await Request.countDocuments();

  await request(app)
    .delete('/api/requests/delete/02314')
    .set('Cookie', [`token=${tokens[0]}`])
    .send()
    .expect(404);

  expect(await Request.countDocuments()).toBe(count);
});
it('Should delete a report request', async () => {
  const count = await Request.countDocuments();

  await request(app)
    .delete(`/api/requests/delete/${requestFour._id}`)
    .set('Cookie', [`token=${tokens[0]}`])
    .send()
    .expect(200);

  expect(await Request.countDocuments()).toBe(count - 1);
});
it('Should delete a bug request and a report request', async () => {
  const count = await Request.countDocuments();

  await request(app)
    .delete(`/api/requests/delete/${requestOne._id}`)
    .set('Cookie', [`token=${tokens[0]}`])
    .send()
    .expect(200);
  await request(app)
    .delete(`/api/requests/delete/${requestFour._id}`)
    .set('Cookie', [`token=${tokens[0]}`])
    .send()
    .expect(200);
  expect(await Request.countDocuments()).toBe(count - 2);
});