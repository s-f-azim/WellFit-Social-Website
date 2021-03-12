import express from 'express';
import {
  createReview,
  getReviews,
  deleteReview,
} from '../controllers/reviews.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router({ mergeParams: true });

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createReview);

router
  .route('/')
  .delete(passport.authenticate('jwt', { session: false }), deleteReview);

router.route('/').get(getReviews);

export default router;