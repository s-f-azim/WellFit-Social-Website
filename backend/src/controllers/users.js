import asyncHandler from "../middleware/async.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

/**
 * @async
 * @desc create a user
 * @route POST /api/users/signup
 * @access public
 */
const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  const token = generateToken(user.id);
  res.status(201).send({ success: true, data: user, token });
});

export { createUser };
