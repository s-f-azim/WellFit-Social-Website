import request from 'supertest';
import app from '../src/app.js';
import { setupInstructors } from './fixtures/db.js';

beforeAll(setupInstructors);

it('Should get all instructors', async () => {
  const response = await request(app).get('/api/users?role=instructors');
  expect(response.body.data.length).toBe(6);
});
it('Should get all instructors with x in name', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&fName=x'
  );
  expect(response.body.data.length).toBe(1);
});
it('Should get all instructors with name x and who are female', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&fName=x&&gender=Female'
  );
  expect(response.body.data.length).toBe(0);
});
it('Should get all with letter a', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&fName=a'
  );
  expect(response.body.data.length).toBe(6);
});
it('Should get all non-binary instructors', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&gender=Non-Binary'
  );
  expect(response.body.data.length).toBe(1);
});
it('Should get all female instructors', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&gender=Female'
  );
  expect(response.body.data.length).toBe(4);
});
it('Should get all instructors with tag Cycling', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&tags[in]=Cycling'
  );
  expect(response.body.data.length).toBe(2);
});
it('Should get all instructors with tag Cycling and Sweat', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&tags[in]=Cycling,Sweat'
  );
  expect(response.body.data.length).toBe(1);
});
it('Should return no Instructors with invalid tag', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&tags[in]=test'
  );
  expect(response.body.data.length).toBe(0);
});
it('Should return one instructor with all filters set', async () => {
  const response = await request(app).get(
    '/api/users?role=instructor&&fName=a&&gender=Male&&age=20&&tags[in]=Cardio'
  );
  expect(response.body.data.length).toBe(1);
});
