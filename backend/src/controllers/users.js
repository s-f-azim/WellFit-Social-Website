import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";

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
 * @desc add following user profile
 * @route PATCH /api/users/follow
 * @access private
 */
const followUser = asyncHandler(async (req, res) => {
  // User.findOne({ _id: req.body.user_id }, (err, user) => {
  //   if (err) { res.send(err); }
  //   if (user._id.str === req.user._id) { res.send("User cannot follow itself"); }
  //   if (req.user.following.includes(req.body.user_id)) { res.send("Already followes"); }
  //   req.user.following.push(req.body.user_id);
  // })
  // const updatedUser = await req.user.save();
  // sendTokenResponse(updatedUser, 200, res);
  if (User.findOne({ _id: req.body.user_id })) {
    if (!req.user.following.includes(req.body.user_id)) {
      req.user.following.push(req.body.user_id);
    }
    else {
      const index = req.user.following.indexOf(req.body.user_id);
      req.user.following.splice(index, 1);
    }
    const updatedUser = await req.user.save();
    sendTokenResponse(updatedUser, 200, res);
  }
  // else {
  //   const updatedUser = req.user;
  //   sendTokenResponse(updatedUser, 400, res);
  // }
});

/**
 * @async
 * @desc get user following list
 * @route GET /api/users/followList
 * @access private
 */
const getFollowing = asyncHandler(async (req, res) => {
  for (var i = 0; i < req.user.following.length; i++) {
    User.findById(req.user.following[i], (err, user) => {
      if (err) { res.send(err); }
      console.log(user.name);
    })
  }
  res.status(200).send({ success: true, data: req.user.following });
});

/**
 * @async
 * @desc logout the user and delete the cookie
 * @route GET /api/users/logout
 * @access private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  res.status(200).send({ success: true });
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
  };
  if (process.env.NODE_ENV === "PRODUCTION") options.secure = true;
  res
    .status(statusCode)
    .cookie("token", token, options)
    .send({ success: true, token, data: user });
};
export { createUser, loginUser, getUser, logoutUser, updateUser, followUser, getFollowing };
