import express from 'express';
import { createCourse, updateCourse } from '../controllers/courses.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router();

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createCourse);
