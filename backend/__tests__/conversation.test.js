import request from 'supertest';
import Conversation from '../src/models/Conversation.js';
import app from '../src/app.js';
import {
  tokens,
  userOne,
  userTwo,
  userThree,
  setupDatabase,
  conversationTwo,
} from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

it('Should not be able to create a new conversation when not logged in', async () => {
  await request(app).post('/api/conversation').send().expect(401);
});

it('Should be able to create a new conversation when logged in', async () => {
  await request(app)
    .post('/api/conversation')
    .send({ users: [userOne._id] })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(201);
});

it('Should not be able to get into a conversation that doesnt include the user', async () => {
  const response = await request(app)
    .get(`/api/conversation/${userTwo._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  expect(response.data).toEqual(undefined);
});

it('Should be able to get into a conversation that does include the user', async () => {
  await request(app)
    .get(`/api/conversation/${userOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
});

it('Should be able to send messages', async () => {
  const count = conversationTwo.messages.length;
  await request(app)
    .patch('/api/conversation')
    .send({
      users: [userThree._id, userTwo._id],
      message: { author: userTwo._id, content: 'hey there' },
    })
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);
  const convo = await Conversation.findById(conversationTwo._id);
  expect(convo.messages.length).toBe(count + 1);
});
