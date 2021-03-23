import request from 'supertest';
import Post from '../src/models/Post.js';
import app from '../src/app.js';
import { tokens, userOne, postOne, setupDatabase } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

it('Should create a post with valid data', async () => {
  const count = await Post.countDocuments();
  const post = { content: 'test', videoUrl: 'test' };

  const response = await request(app)
    .post('/api/posts')
    .send(post)
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(response.body.data).not.toBeNull();
  expect(await Post.countDocuments()).toBe(count + 1);
});

it('Should not create a post with invalid data', async () => {
  const count = await Post.countDocuments();
  const post = { videoUrl: 'test' };

  await request(app)
    .post('/api/posts')
    .send(post)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(400);

  expect(await Post.countDocuments()).toBe(count);
});

it('Should allow same user to create many posts', async () => {
  const count = await Post.countDocuments();
  const post = { content: 'test', videoUrl: 'test' };

  await request(app)
    .post('/api/posts')
    .send(post)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  await request(app)
    .post('/api/posts')
    .send(post)
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  expect(await Post.countDocuments()).toBe(count + 2);
});

it('Should get posts by author', async () => {
  const response = await request(app)
    .get(`/api/posts/author/${userOne._id}`)
    .send()
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

it('Should get feed posts', async () => {
  const response = await request(app)
    .get('/api/posts/feed')
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(200);

  expect(response.body.data).not.toBeNull();
});

it('Should delete a post', async () => {
  const count = await Post.countDocuments();

  await request(app)
    .delete(`/api/posts/${postOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[0]}`])
    .expect(200);

  expect(await Post.countDocuments()).toBe(count - 1);
});

it('Should not delete a post if user is not the author', async () => {
  const count = await Post.countDocuments();

  await request(app)
    .delete(`/api/posts/${postOne._id}`)
    .send()
    .set('Cookie', [`token=${tokens[1]}`])
    .expect(400);

  expect(await Post.countDocuments()).toBe(count);
});
