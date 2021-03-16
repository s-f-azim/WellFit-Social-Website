import express from 'express';
import {
  createCourseReview,
  getCourseReviews,
  deleteCourseReview,
} from '../controllers/courseReviews.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router({ mergeParams: true });

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createCourseReview);

router.route('/').get(getCourseReviews);

router
  .route('/')
  .delete(passport.authenticate('jwt', { session: false }), deleteCourseReview);

export default router;
