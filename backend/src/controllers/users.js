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
  const token = user.getSginedJWTToken();
  res.status(201).send({ success: true, data: user, token });
});

/**
 * @async
 * @desc login a user given the email and password
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.checkCredentials(req.body);
  const token = user.getSginedJWTToken();
  res.status(200).send({ success: true, data: user, token });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).send({ success: true, data: req.user, });
});

export { createUser, loginUser, getUser };
