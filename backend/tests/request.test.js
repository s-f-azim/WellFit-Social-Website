import request from 'supertest';
import User from '../src/models/User.js';
import Request from '../src/models/Request.js';
import app from '../src/app.js';
import { tokens, userOne, userTwo, setupDatabase } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

// assert update a user attribute
it('Verify request should increment', async () => {
  const verifyNumBeforeRequest = await Request.countDocuments({
    type: 'verify',
  });
  await request(app)
    .post('/api/requests/create')
    .send({
      author: userTwo._id,
      type: 'verify',
      content: 'verify me test',
    })
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);
  const verifyNumAfterRequest = await Request.countDocuments({
    type: 'verify',
  });
  expect(verifyNumAfterRequest).toBe(verifyNumBeforeRequest + 1);
});

it('Verify request should not increment', async () => {
  await request(app)
    .post('/api/requests/create')
    .send({
      author: userOne._id,
      type: 'verify',
      content: 'verify me test',
    })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);
});

it('Instructor should be verified', async () => {
  await request(app)
    .patch(`/api/requests/verify/${userTwo._id}`)
    .set('Cookie', [`token=${tokens[4]}`])
    .expect(200);
  const statusAfter = await User.findById(userTwo._id);

  expect(statusAfter.verified).toBeTruthy();
});

it('Client should not be verified', async () => {
  await request(app)
    .patch(`/api/requests/verify/${userOne._id}`)
    .set('Cookie', [`token=${tokens[4]}`])
    .expect(200);
  const statusAfter = await User.findById(userOne._id);

  expect(statusAfter.verified).toBeFalsy();
});

it('Non admin user should not be able to verify someone', async () => {
  await request(app)
    .patch(`/api/requests/verify/${userTwo._id}`)
    .set('Cookie', [`token=${tokens[2]}`])
    .expect(400);
});
