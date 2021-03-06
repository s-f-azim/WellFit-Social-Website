import request from 'supertest';
import Course from '../src/models/Course.js';
import app from '../src/app.js';
import { tokens, userOne, setupDatabase } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

// assert creating a new course while logged in
it('Should create a new course', async () => {
  const count = await Course.countDocuments();
  const response = await request(app)
    .post('/api/courses/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send({
      title: 'The best course',
      description: 'THe best course in kingston',
      creators: [userOne._id],
      address: 'kt2 6qw',
      price: 0,
      tags: ['Cardio'],
    })
    .expect(201);
  const course = await Course.findById(response.body.data._id);
  expect(course).not.toBeNull;
  expect(await Course.countDocuments()).toBe(count + 1);
});

// assert creating a new course when not logged in
it('Should not create a new course when not logged in', async () => {
  await request(app)
    .post('/api/courses/create')
    .send({
      title: 'The best course',
      description: 'THe best course in kingston',
      creators: [userOne._id],
      address: 'kt2 6qw',
      price: 0,
      tags: ['Cardio'],
    })
    .expect(401);
});

// assert creating a new course with invalid data
it('Should not create a new course with invalid data', async () => {
  await request(app)
    .post('/api/courses/create')
    .set('Cookie', [`token=${tokens[0]}`])
    .send({
      title: 'The best course',
      description: 'THe best course in kingston',
      creators: [userOne._id],
      address: 'kt2 6qw',
      price: 0,
      tags: ['test'],
    })
    .expect(400);
});
