import request from 'supertest';
import User from '../src/models/User.js';
import app from '../src/app.js';
import { tokens, userOne, userTwo, setupDatabase } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

// assert signup with valid data
it('Should signup a new user', async () => {
  const count = await User.countDocuments();
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'testEmail1@test.com', password: '12345678', name: 'test' })
    .expect(201);
  // assert that the database was changed correctly
  const user = await User.findById(response.body.data._id);
  expect(user).not.toBeNull;
  expect(await User.countDocuments()).toBe(count + 1);
});
// assert signup with invalid data (duplicate email)
it('Should not signup a new user', async () => {
  const count = await User.countDocuments();
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testEmail@test.com',
      password: 'password12@',
      name: 'testUser1',
    })
    .expect(400);
  expect(await User.countDocuments()).toBe(count);
});

// assert user login with valid data
it('Should login user', async () => {
  await request(app).post('/api/users/login').send(userOne).expect(200);
});

// assert user login with invalid data
it('Should login user', async () => {
  await request(app).post('/api/users/login').expect(404);
});

// assert logout of a user
it('Should logout a user', async () => {
  await request(app).post('/api/users/login').send(userOne).expect(200);
  await request(app).get('/api/users/logout').expect(200);
});

// assert non logged in user cant edit their information
it('Should not edit profile when not logged in', async () => {
  await request(app).patch('/api/users/editProfile').send().expect(401);
});
// assert only logged in user can edit their information
it('Should not edit profile when not logged in', async () => {
  await request(app)
    .patch('/api/users/editProfile')
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
});
// assert update a user attribute
it("Should update a user's valid attribute", async () => {
  await request(app)
    .patch('/api/users/editProfile')
    .send({ email: 'testtttttttt@test.com' })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.email).toBe('testtttttttt@test.com');
});

// assert update a user attribute
it("Should not update a user's invalid attribute", async () => {
  await request(app)
    .patch('/api/users/editProfile')
    .send({ size: 'large' })
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.size).toEqual(undefined);
});

// userId should be added to follow array
it("Should increment user's following count", async () => {
  await request(app)
    .patch(`/api/users/follow/${userTwo._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.following).toHaveLength(1);
});

// same user's userId shouldn't be added to follow array
it("Shouldn't change user's following count", async () => {
  await request(app)
    .patch(`/api/users/follow/${userOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.following).toHaveLength(0);
});

// userId should be added then removed again upon add request
it("Should increment user's following count", async () => {
  await request(app)
    .patch(`/api/users/follow/${userTwo._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  await request(app)
    .patch(`/api/users/follow/${userTwo._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.following).toHaveLength(0);
});

// assert delete a user
it('Should delete a logged in user', async () => {
  await request(app)
    .delete('/api/users/delete')
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const userExists = await User.exists({ _id: userOne._id });
  expect(userExists).toEqual(false);
});

it('Should not delete a user when not logged in', async () => {
  await request(app).delete('/api/users/delete').send().expect(401);
});

// assert delete a user
it('Should delete a logged in user', async () => {
  await request(app)
    .delete('/api/users/delete')
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);
  const userExists = await User.exists({ _id: userOne._id });
  expect(userExists).toEqual(false);
});
// assert can't delete user when not logged in
it('Should not delete a user when not logged in', async () => {
  await request(app).delete('/api/users/delete').send().expect(401);
});

// assert get all users
it('Should get all users', async () => {
  const response = await request(app).get('/api/users').send().expect(200);
  expect(response.body.count).toBe(2);
});

// assert get users with filters
it('Should get all users', async () => {
  const response = await request(app)
    .get('/api/users?name=testUser1')
    .send()
    .expect(200);
  expect(response.body.count).toBe(1);
});
// assert get users with filters and select specific fields
it('Should get all users', async () => {
  const response = await request(app)
    .get('/api/users?name=testUser1&&select=name')
    .send()
    .expect(200);
  expect(response.body.count).toBe(1);
  expect(response.body.data[0].email).toEqual(undefined);
  expect(response.body.data[0].name).toEqual(userOne.name);
});
// assert get users within radius
it('Should get all users', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testEmail1@test.com',
      password: '12345678',
      name: 'test',
      address: 'kt2 6qw',
    })
    .expect(201);
  const response = await request(app)
    .get('/api/users/radius/kt26qw/1')
    .send()
    .expect(200);
  expect(response.body.count).toBe(1);
});
