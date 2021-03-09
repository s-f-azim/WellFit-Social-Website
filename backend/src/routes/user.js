import express from 'express';
import {
  getUsers,
  getUsersWithinRadius,
  createUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  deleteUser,
  addToWishList,
  removeFromWishList,
  googleOauth,
  facebookOauth,
  instagramOauth,
  uploadImages,
  deleteImages,
  getProfile,
} from '../controllers/users.js';
import passport from '../../config/passport-setup.js';
import paginate from '../middleware/paginate.js';
import User from '../models/User.js';
import upload from '../middleware/multer.js';

const router = new express.Router();

router.route('/').get(paginate(User), getUsers);

router.route('/:id').get(getUser);

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
  .route('/avatar')
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.array('images', 10),
    uploadImages
  );
router
  .route('/avatar')
  .delete(passport.authenticate('jwt', { session: false }), deleteImages);

router
  .route('/me')
  .get(passport.authenticate('jwt', { session: false }), getProfile);

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
  .route('/addToWishList/:id')
  .patch(passport.authenticate('jwt', { session: false }), addToWishList);

router
  .route('/removeFromWishList/:id')
  .patch(passport.authenticate('jwt', { session: false }), removeFromWishList);

export default router;
