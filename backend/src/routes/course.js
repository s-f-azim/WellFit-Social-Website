import express from 'express';
import {
  createCourse,
  updateCourse,
  getCoursesWithinRadius,
  getCourses,
  deleteCourse,
} from '../controllers/courses.js';
import passport from '../../config/passport-setup.js';
import paginate from '../middleware/paginate.js';
import Course from '../models/Course.js';

const router = new express.Router();

router.route('/').get(paginate(Course), getCourses);

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createCourse);

router
  .route('/update/:id')
  .patch(passport.authenticate('jwt', { session: false }), updateCourse);

router
  .route('/radius/:zipcode/:distance')
  .get(paginate(Course), getCoursesWithinRadius);

router
  .route('/delete/:id')
  .delete(passport.authenticate('jwt', { session: false }), deleteCourse);

export default router;
