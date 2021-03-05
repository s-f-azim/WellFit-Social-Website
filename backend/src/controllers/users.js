/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';

/**
 * @async
 * @desc create a user
 * @route POST /api/users/signup
 * @access public
 */
const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  sendTokenResponse(user, 201, res);
});

/**
 * @async
 * @desc login a user given the email and password
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.checkCredentials(req.body);
  sendTokenResponse(user, 200, res);
});

/**
 * @async
 * @desc get user profile
 * @route GET /api/users/profile
 * @access private
 */
const getUser = asyncHandler(async (req, res) => {
  res.status(200).send({ success: true, data: req.user });
});

/**
 * @async
 * @desc update user profile
 * @route PATCH /api/users/editprofile
 * @access private
 */
const updateUser = asyncHandler(async (req, res) => {
  const updates = Object.keys(req.body);
  updates.forEach(
    (update) =>
      req.body[update] !== undefined && (req.user[update] = req.body[update])
  );
  const updatedUser = await req.user.save();
  sendTokenResponse(updatedUser, 200, res);
});

/**
 * @async
 * @desc logout the user and delete the cookie
 * @route GET /api/users/logout
 * @access private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  res.status(200).send({ success: true });
});

/**
 * @async
 * @desc create a review for another user
 * @route POST /api/users/review/:id
 * @access private
 */
const createReview = asyncHandler(async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res.status(400).send({ error: 'Please do not review yourself' });
  }

  const otherUser = await User.findById(req.params.id);

  if (
    otherUser.reviews.some((review) => review.author._id.equals(req.user._id))
  ) {
    return res.status(400).send({ error: 'You already reviewed this user' });
  }

  otherUser.reviews.push({
    author: req.user,
    ...req.body,
  });

  await otherUser.save();
  return res.status(200).send({ success: true });
});

/**
 * @async
 * @desc get user profile
 * @route GET /api/users/profile
 * @access public
 */
 const getReviews = asyncHandler(async (req, res) => {
  const reviews = await User.findById(req.params.id, 'reviews')
  res.status(200).send({ success: true, data: reviews });
});

/**
 * @async
 * @desc delete a review
 * @route DELETE /api/users/review/:id
 * @access private
 */
const deleteReview = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    $pull: {
      reviews: {
        author: req.user,
      },
    },
  });

  res.status(200).send({ success: true });
});

/**
 * @async
 * @desc google login user using oauth
 * @route GET /api/users/google/redirect
 * @access private
 */
const googleOauth = asyncHandler(async (req, res) => {
  sendTokenResponseOauth(req.user, 200, res);
});

/**
 * @async
 * @desc facebook login user using oauth
 * @route GET /api/users/faceboo/redirect
 * @access private
 */
const facebookOauth = asyncHandler(async (req, res) => {
  sendTokenResponseOauth(req.user, 200, res);
});

/**
 * @async
 * @desc instagram login user using oauth
 * @route GET /api/users/instagram/redirect
 * @access private
 */
const instagramOauth = asyncHandler(async (req, res) => {
  sendTokenResponseOauth(req.user, 200, res);
});

/**
 * @desc get the token from the user model and create a cookie
 * @param {User} user - a user
 * @param {int} statusCode - integer of status code ex 404
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSginedJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION',
  };
  res
    .status(statusCode)
    .cookie('token', token, options)
    .send({ success: true, token, data: user });
};
/**
 * @desc get the token from the user model and create a cookie
 * @param {User} user - a user
 * @param {int} statusCode - integer of status code ex 404
 */
const sendTokenResponseOauth = (user, statusCode, res) => {
  const token = user.getSginedJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION',
  };
  res.cookie('user', JSON.stringify(user));
  res.cookie('token', token, options);
  res.redirect(`${process.env.CLIENT_URL}`);
};
export {
  createUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  createReview,
  getReviews,
  deleteReview,
  googleOauth,
  facebookOauth,
  instagramOauth,
};
