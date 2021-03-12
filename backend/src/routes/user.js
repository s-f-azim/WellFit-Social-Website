import express from 'express';
import {
  getUsers,
  getUsersWithinRadius,
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  googleOauth,
  facebookOauth,
  instagramOauth,
  getSuggestedInstructors,
  followUser,
  getFollowing,
} from '../controllers/users.js';
import passport from '../../config/passport-setup.js';
import paginate from '../middleware/paginate.js';
import User from '../models/User.js';

const router = new express.Router();

router.route('/').get(paginate(User), getUsers);
router
  .route('/radius/:zipcode/:distance')
  .get(paginate(User), getUsersWithinRadius);
router.route('/signup').post(createUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);

router
  .route('/editProfile')
  .patch(passport.authenticate('jwt', { session: false }), updateUser);

router
  .route('/me')
  .get(passport.authenticate('jwt', { session: false }), getUser);

router.route('/oauth/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router
  .route('/oauth/google/redirect')
  .get(passport.authenticate('google', { session: false }), googleOauth);

router.route('/oauth/instagram').get(
  passport.authenticate('instagram', {
    session: false,
    scope: ['user_profile'],
  })
);

router
  .route('/oauth/instagram/redirect')
  .get(passport.authenticate('instagram', { session: false }), instagramOauth);

router.route('/oauth/facebook').get(
  passport.authenticate('facebook', {
    session: false,
    scope: ['email'],
  })
);

router
  .route('/delete')
  .delete(passport.authenticate('jwt', { session: false }), deleteUser);

router
  .route('/oauth/facebook/redirect')
  .get(passport.authenticate('facebook', { session: false }), facebookOauth);

router
  .route('/profile')
  .get(
    passport.authenticate('jwt', { session: false }),
    getSuggestedInstructors
  );
router
  .route('/follow/:id')
  .patch(passport.authenticate('jwt', { session: false }), followUser);
router
  .route('/getFollowing')
  .get(passport.authenticate('jwt', { session: false }), getFollowing);

export default router;
