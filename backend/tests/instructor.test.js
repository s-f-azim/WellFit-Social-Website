import request from 'supertest';
import User from '../src/models/User.js';
import app from '../src/app.js';
import { tokens, userOne, setupDatabase } from './fixtures/db.js';

// setup db for each test
beforeEach(setupDatabase);

// assert get instructors without filters
it('Should get all instructors', async () => {
    const response = await request(app)
      .get('/api/users/instructors');
    expect(response.body.length).toBe(6);
  });

it('Should get all female instructors', async () => {
    const response = await request(app)
      .get('/api/users/instructors?gender=female');
    expect(response.body.length).toBe(4);
  });

