import express from 'express';
import {
  createUserReview,
  getUserReviews,
  deleteUserReview,
} from '../controllers/userReviews.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router({ mergeParams: true });

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createUserReview);

router.route('/').get(getUserReviews);

router
  .route('/')
  .delete(passport.authenticate('jwt', { session: false }), deleteUserReview);

export default router;
