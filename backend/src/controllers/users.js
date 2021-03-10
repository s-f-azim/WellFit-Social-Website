/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

/**
 * @async
 * @desc get user by ID
 * @route GET /api/users/:id
 * @access public
 */
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).send({
    success: true,
    data: user,
  });
});

/**
 * @async
 * @desc Get all users
 * @route POST /api/users?select=fields&&location[city,zipcode,street]&&tags&&sort
 * @access public
 */
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).send({
    success: true,
    count: res.results.length,
    pagination: res.pagination,
    data: res.results,
  });
});
/**
 * @async
 * @desc  get all users within a radius
 * @route GET /api/users/radius/:zipcode/:distance
 * @access public
 */
const getUsersWithinRadius = asyncHandler(async (req, res) => {
  res.status(200).send({
    success: true,
    count: res.results.length,
    pagination: res.pagination,
    data: res.results,
  });
});

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
 * @route GET /api/users/me
 * @access private
 */
const getProfile = asyncHandler(async (req, res) => {
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
 *
 * @async
 * @desc delete user from the db
 * @route DELETE /api/users/delete
 *
 */
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).send({ success: true });
});

/**
 * @async
<<<<<<< HEAD
 * @desc add specified course to user's wish list if it already exists remove it
=======
 * @desc get the courses from the wish list of the user
 * @route GET /api/users/getwishlist/
 * @access private
 */
const getWishListCourses = asyncHandler(async (req, res) => {
  const wishList = req.user.wishList;
  let courses = [];
  wishList.forEach((courseID) => {
    courses.push(Course.findById(courseID));
  });
  sendTokenResponse(courses, 200, res);
});

/**
 * @async
 * @desc add specified course to user's wish list
>>>>>>> 2572a7f1ee941eb43ea89a169740d34908d3cb66
 * @route PATCH /api/users/addtowishlist/:id
 * @access private
 */
const addToWishList = asyncHandler(async (req, res) => {
  if (Course.findById(req.params.id)) {
    const index = req.user.wishlist.indexOf(req.params.id);
    if (index === -1) {
      req.user.wishlist.push(req.params.id);
    } else {
      req.user.wishlist.splice(index, 1);
    }
  }
  const updatedUser = await req.user.save();
  sendTokenResponse(updatedUser, 200, res);
});
/**
 * @async
 * @desc get all wishlist
 * @route GET /api/users/wishlist
 * @access private
 */
const getWishList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist').exec();
  res.status(200).send({ success: true, data: user.wishlist });
});

/**
 * @async
 * @desc remove specified course from user's wish list
 * @route PATCH /api/users/removefromwishlist/:id
 * @access private
 */
/* const removeFromWishList = asyncHandler(async (req, res) => {
  if (Course.findById(req.params.id)) {
    const index = req.user.wishList.indexOf(req.params.id);
    if (index > -1) {
      req.user.wishList.splice(index, 1);
    }
  }
  const updatedUser = await req.user.save();
  sendTokenResponse(updatedUser, 200, res);
}); */

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
 * @route GET /api/users/facebook/redirect
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
 * @async
 * @desc upload images
 * @route POST /api/users/avatar
 * @access private
 */
const uploadImages = asyncHandler(async (req, res) => {
  let formattedImages = [];
  req.files.forEach((file) => formattedImages.push(file.buffer));
  formattedImages.map(
    async (image) =>
      await sharp(image).resize({ width: 250, height: 250 }).png().toBuffer()
  );
  req.user.photos = formattedImages;
  await req.user.save();
  sendTokenResponse(req.user, 200, res);
});

/**
 * @async
 * @desc delete images
 * @route DELETE /api/users/avatar
 * @access private
 */
const deleteImages = asyncHandler(async (req, res) => {
  req.user.photos = undefined;
  await req.user.update();
  sendTokenResponse(req.user, 200, res);
});

/**
 * @desc get the token from the user model and create a cookie
 * @param {User} user - a user
 * @param {int} statusCode - integer of status code ex 404
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWTToken();
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
  const token = user.getSignedJWTToken();
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
  getUsers,
  getUsersWithinRadius,
  createUser,
  loginUser,
  getProfile,
  getUser,
  logoutUser,
  updateUser,
  deleteUser,
  getWishListCourses,
  addToWishList,
  googleOauth,
  facebookOauth,
  instagramOauth,
  uploadImages,
  deleteImages,
  getWishList,
};
