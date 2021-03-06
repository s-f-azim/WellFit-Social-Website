import express from 'express';
import {
  createCourse,
  updateCourse,
  getCoursesWithinRadius,
} from '../controllers/courses.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router();

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createCourse);
router
  .route('/update/:id')
  .patch(passport.authenticate('jwt', { session: false }), updateCourse);
router.route('/radius/:zipcode/:distance').get(getCoursesWithinRadius);

export default router;
