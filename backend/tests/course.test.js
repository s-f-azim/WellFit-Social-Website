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
  dropDb,
} from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);
afterAll(dropDb);

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
it('Should update a courses valid attribute', async () => {
  await request(app)
    .patch(`/api/courses/update/${courseOne._id}`)
    .send({ title: 'test course' })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const course = await Course.findById(courseOne._id);
  expect(course.title).toBe('test course');
});
// assert update a course attribute when not logged in
it('Should not update a courses valid attribute when not logged in', async () => {
  await request(app)
    .patch(`/api/courses/update/${courseOne._id}`)
    .send({ title: 'test course' })
    .expect(401);
});
// assert update a course attribute by someone who isnt the owner
it('Should not update a courses valid attribute by someone who isnt the owner', async () => {
  await request(app)
    .patch(`/api/courses/update/${courseTwo._id}`)
    .send({ title: 'test course' })
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(500);
});
// assert get all courses
it('Should get all courses', async () => {
  const response = await request(app).get('/api/courses').send().expect(200);
  expect(response.body.count).toBe(4);
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
  expect(response.body.count).toBe(4);
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
// assert get all courses
it('Should get all the courses', async () => {
  const response = await request(app).get('/api/courses').send().expect(200);
  expect(response.body.data.length).toBe(4);
});
// assert get all courses with title lose
it('Should get all courses with title lose', async () => {
  const response = await request(app)
    .get('/api/courses?title=lose')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(2);
});
// assert get all courses with title weight
it('Should get all courses with title weight', async () => {
  const response = await request(app)
    .get('/api/courses?title=weight')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(1);
});
// assert get all courses with title b
it('Should get no courses with title b', async () => {
  const response = await request(app)
    .get('/api/courses?title=b')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(0);
});
// assert get all courses with title weight and tag getfit
it('Should get 1 course with title weight and tag GetFit', async () => {
  const response = await request(app)
    .get('/api/courses?title=weight&&tags[all]=GetFit')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(1);
});
// assert get courses with tag cardio
it('Should get 3 courses with no title and tag Cardio', async () => {
  const response = await request(app)
    .get('/api/courses?tags[all]=Cardio')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(3);
});
// assert get courses with tag cycling
it('Should get no course with tag Cycling', async () => {
  const response = await request(app)
    .get('/api/courses?tags[all]=Cycling')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(0);
});
// assert get couse cycling
it('Should get no course with tag Cycling', async () => {
  const response = await request(app)
    .get('/api/courses?tags[all]=Cycling')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(0);
});
// assert get courses with equipment tags
it('Should get 2 courses with equipment treadmill', async () => {
  const response = await request(app)
    .get('/api/courses?trainingEquipment[all]=treadmill')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(2);
});
// assert get courses with equipment tags and tags
it('Should get 1 course with equipment treadmill and tag FitFam', async () => {
  const response = await request(app)
    .get('/api/courses?tags[all]=FitFam&&trainingEquipment[all]=treadmill')
    .send()
    .expect(200);
  expect(response.body.data.length).toBe(1);
});
