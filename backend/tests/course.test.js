import request from 'supertest';
import Course from '../src/models/Course.js';
import app from '../src/app.js';
import {
  tokens,
  userOne,
  userTwo,
  setupDatabase,
  courseOne,
  courseTwo,
} from './fixtures/db.js';

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
// assert delete a course
it('Should delete a course when logged in and own the course', async () => {
  await request(app)
    .delete(`/api/courses/delete/${courseOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const courseExits = await Course.exists({ _id: courseOne._id });
  expect(courseExits).toEqual(false);
});
// assert can't delete user when not logged in
it('Should not delete a course when not logged in', async () => {
  await request(app)
    .delete(`/api/courses/delete/${courseOne._id}`)
    .send()
    .expect(401);
});
// assert can't delete user when not logged in
it('Should not delete a course by someone who dont own the course', async () => {
  await request(app)
    .delete(`/api/courses/delete/${courseTwo._id}`)
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(500);
});
// assert update a course attribute
it("Should update a course's valid attribute", async () => {
  await request(app)
    .patch(`/api/courses/update/${courseOne._id}`)
    .send({ title: 'test course' })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const course = await Course.findById(courseOne._id);
  expect(course.title).toBe('test course');
});
// assert update a course attribute when not logged in
it("Should not update a course's valid attribute when not logged in", async () => {
  await request(app)
    .patch(`/api/courses/update/${courseOne._id}`)
    .send({ title: 'test course' })
    .expect(401);
});
// assert update a course attribute by someone who isnt the owner
it("Should not update a course's valid attribute by someone who isnt the owner", async () => {
  await request(app)
    .patch(`/api/courses/update/${courseTwo._id}`)
    .send({ title: 'test course' })
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(500);
});
// assert get all courses
it('Should get all courses', async () => {
  const response = await request(app).get('/api/courses').send().expect(200);
  expect(response.body.count).toBe(2);
});
// assert get courses with filters and select specific fields
it('Should get all courses with select and filters', async () => {
  const response = await request(app)
    .get('/api/courses?slug=lose-it&&select=title')
    .send()
    .expect(200);
  expect(response.body.count).toBe(1);
  expect(response.body.data[0].description).toEqual(undefined);
  expect(response.body.data[0].title).toEqual(courseTwo.title);
});
// assert get courses within radius
it('Should get all courses within range', async () => {
  const response = await request(app)
    .get('/api/courses/radius/kt26qw/1')
    .send()
    .expect(200);
  expect(response.body.count).toBe(1);
});
// assert should get the single creator of a course
it('Should get the creator of a course', async () => {
  const response = await request(app)
    .get(`/api/courses/${courseTwo._id}/creators`)
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(1);
  expect(response.body.data[0]._id === userOne._id);
});
// assert should get all creators of a course
it('Should get all the creators of a course when there are several', async () => {
  const response = await request(app)
    .get(`/api/courses/${courseOne._id}/creators`)
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(2);
  expect(response.body.data[0]._id === userTwo._id);
  expect(response.body.data[1]._id === userOne._id);
});
