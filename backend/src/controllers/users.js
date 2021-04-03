/* eslint-disable no-use-before-define */
import sharp from 'sharp';
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
 * @route GET /api/users?select=fields&&location[city,zipcode,street]&&tags&&sort
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
  if (user.isBanned) {
    sendTokenResponse(user, 401, res);
  } else {
    sendTokenResponse(user, 200, res);
  }
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
 * @desc get a user by providing email
 * @route GET /api/users/email/:email
 * @access private
 */
const getUserIdByEmail = asyncHandler(async (req, res) => {
  User.findOne({ email: req.params.email }, '_id').exec((err, user) => {
    if (!user)
      return res.status(400).send({
        success: false,
        error: `User ${req.params.email} does not exist`,
      });
    return res.status(200).send({ success: true, data: user._id });
  });
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
 * @desc add following user profile
 * @route PATCH /api/users/follow/:id
 * @access private
 */
const followUser = asyncHandler(async (req, res) => {
  const followeeUser = await User.findOne({ _id: req.params.id });
  const followingUser = await User.findById(req.user._id);
  if (
    !followingUser.following.includes(followeeUser._id) &&
    `${followingUser._id} ` !== `${followeeUser._id} `
  ) {
    followingUser.following.push(followeeUser._id);
    followeeUser.follower.push(followingUser._id);
  } else {
    const index = followingUser.following.indexOf(followeeUser._id);
    const followerIndex = followeeUser.follower.indexOf(followingUser._id);
    if (index > -1) followingUser.following.splice(index, 1);
    if (followerIndex > -1) followeeUser.follower.splice(followerIndex, 1);
  }
  await followeeUser.save();
  await followingUser.save();
  sendTokenResponse(followingUser, 200, res);
});

/**
 * @async
 * @desc get user following list
 * @route GET /api/users/getFollowing/:id?page=pageNumber&&limit=
 * @access private
 */
const getFollowing = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const followings = await User.findById(req.params.id).populate({
    path: 'following',
    select: ['fName', 'lName', 'photos'],
  });
  const result = followings.following.slice(startIndex, limit);
  res.status(200).send({
    success: true,
    data: result ? result : [],
    pagination: {
      total: followings.following.length,
    },
  });
});

/**
 * @async
 * @desc get user follower list
 * @route GET /api/users/getFollower/:id?page=pageNumber&&limit=`
 * @access private
 */
const getFollower = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const followers = await User.findById(req.params.id).populate({
    path: 'follower',
    select: ['fName', 'lName', 'photos'],
  });
  const result = followers.follower.slice(startIndex, limit);
  res.status(200).send({
    success: true,
    data: result ? result : [],
    pagination: {
      total: followers.follower.length,
    },
  });
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
 * @desc delete current user from the db
 * @route DELETE /api/users/delete
 *
 */
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).send({ success: true });
});

/**
 *
 * @async
 * @desc delete user with id from the db
 * @route DELETE /api/users/delete/:id
 *
 */
const deleteSpecificUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send({ success: true });
});

/**
 * @async
 * @desc add specified course to user's wish list - if it already exists, remove it
 * @route PATCH /api/users/updatewishlist/:id
 * @access private
 */
const updateWishList = asyncHandler(async (req, res) => {
  if (Course.findById(req.params.id)) {
    if (req.user.role === 'client') {
      const index = req.user.wishlist.indexOf(req.params.id);
      if (index === -1) {
        req.user.wishlist.push(req.params.id);
      } else {
        req.user.wishlist.splice(index, 1);
      }
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
  const user = await User.findById(req.user._id).populate('wishlist');
  res.status(200).send({ success: true, data: user.wishlist });
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
  const formattedImages = [];
  req.files.forEach((file) => formattedImages.push(file.buffer));
  /* eslint-disable no-return-await */
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
    sameSite: 'none',
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
    sameSite: 'none',
  };
  res.cookie('user', JSON.stringify(user));
  res.cookie('token', token, options);
  res.redirect(`${process.env.CLIENT_URL}`);
};

/**
 * @async
 * @desc Get suggested instructors for user based on random tag selected, client gender preference
 * @param {User} user - a user
 * @route GET /api/users/suggestedInstructors/
 */
const getSuggestedInstructors = asyncHandler(async (req, res) => {
  const users = await User.find({
    $and: [
      { role: 'instructor' },
      { _id: { $ne: req.user._id } },
      {
        $or: [
          {
            tags:
              req.user.tags[Math.floor(Math.random() * req.user.tags.length)],
          },
          { gender: req.user.clientGenderPreference },
        ],
      },
    ],
  }).limit(3);
  res.status(200).send({ success: true, data: users });
});

/**
 * @async
 * @desc Gets trending users on the website
 * @route GET /api/users/trendingUsers
 *
 */
const getTrendingUsers = asyncHandler(async (req, res) => {
  const users = await User.find({
    $and: [
      {
        $or: [{ role: 'instructor' }, { role: 'client' }],
      },
      { follower: { $exists: true, $ne: [] } },
    ],
  });
  res.status(200).send({
    success: true,
    data: users
      .sort((u1, u2) => u2.follower.length - u1.follower.length)
      .slice(0, req.query.limit || 10),
  });
});

/**
 * @desc ban a user
 * @route PATCH api/users/ban/:id
 * @access private
 */
const banUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBanned: true },
    { new: true }
  );
  await user.save();
  sendTokenResponse(user, 200, res);
});

export {
  getUsers,
  getUsersWithinRadius,
  createUser,
  loginUser,
  getProfile,
  getUser,
  getUserIdByEmail,
  logoutUser,
  updateUser,
  deleteUser,
  deleteSpecificUser,
  getWishList,
  updateWishList,
  googleOauth,
  facebookOauth,
  instagramOauth,
  uploadImages,
  deleteImages,
  getSuggestedInstructors,
  followUser,
  getFollowing,
  getFollower,
  getTrendingUsers,
  banUser,
};
