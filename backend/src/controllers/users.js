/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';

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
 * @desc Get all instructors
 * @route GET /api/users?q=&&gender=&&age=&&tags=
 * @access public
 */
const getInstructors = asyncHandler(async (req, res) => {
  const s = req.query.q;
  const regex = new RegExp(s, 'i');
  let instr = await User.find({
    role: 'instructor',
    name: { $regex: regex },
    ...(req.query.gender ? { gender: req.query.gender } : {}),
    ...(req.query.tags ? { tags: { $all: req.query.tags.split(',') } } : {}),
  });

  if (req.query.age) {
    if (parseInt(req.query.age, 10) !== 0) {
      if (parseInt(req.query.age, 10) >= 62) {
        instr = instr.filter((inst) => {
          if (inst.age) {
            return inst.age >= 62;
          }
          return true;
        });
      } else {
        instr = instr.filter((inst) => {
          if (inst.age) {
            return (
              inst.age >= parseInt(req.query.age, 10) - 5 &&
              inst.age <= parseInt(req.query.age, 10) + 5
            );
          }
          return true;
        });
      }
    }
  }

  res.status(200).send({
    success: true,
    count: instr.length,
    data: instr,
  });
});
/**
 * @async
 * @desc  get a users within a radius
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
 * @desc add following user profile
 * @route PATCH /api/users/follow
 * @access private
 */
const followUser = asyncHandler(async (req, res) => {
  if (User.findOne({ _id: req.params.id })) {
    if (
      !req.user.following.includes(req.params.id) &&
      `${req.user._id} ` !== `${req.params.id} `
    ) {
      req.user.following.push(req.params.id);
    } else {
      const index = req.user.following.indexOf(req.params.id);
      if (index > -1) {
        req.user.following.splice(index, 1);
      }
    }
    const updatedUser = await req.user.save();
    sendTokenResponse(updatedUser, 200, res);
  }
});

/**
 * @async
 * @desc get user following list
 * @route GET /api/users/followList
 * @access private
 */
const getFollowing = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = 2;
  const startIndex = (page - 1) * limit;
  const lastIndex = limit * page;
  const followings = await User.findById(req.user._id).populate('following');
  const results = followings.following.slice(startIndex, lastIndex);
  res.status(200).send({ success: true, data: results });
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

/**
 * @async
 * @desc Get suggested instructors for user based on random tag selected, client gender preference
 * @param {User} user - a user
 * @route GET /api/users/profile
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

export {
  getUsers,
  getInstructors,
  getUsersWithinRadius,
  createUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  deleteUser,
  googleOauth,
  facebookOauth,
  instagramOauth,
  getSuggestedInstructors,
  followUser,
  getFollowing,
};
