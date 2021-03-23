import asyncHandler from '../middleware/async.js';
import Request from '../models/Request.js';
import User from '../models/User.js';

/**
 * @async
 * @desc create a request
 * @route POST /api/requests/create
 * @access private
 */
const createRequest = asyncHandler(async (req, res) => {
  if (req.user.role === 'client' && req.body.type === 'verify') {
    res.status(400).send({
      message: 'Clients cant be verified',
      success: false,
      data: req.user,
    });
  } else {
    const request = await Request.create({
      author: req.user._id,
      type: req.body.type,
      content: req.body.content,
      recipient: req.body.recipientID,
    });
    res.status(200).send({ success: true, data: request });
  }
});

/**
 * @async
 * @desc Get all requests
 * @route GET /api/requests
 * @access public
 */
const getRequests = asyncHandler(async (req, res) => {
  res.status(200).send({
    success: true,
    count: res.results.length,
    pagination: res.pagination,
    data: res.results,
  });
});

/**
 *
 * @async
 * @desc delete a request from db
 * @route DELETE /api/requests/delete/:id
 *
 */
const deleteRequest = asyncHandler(async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.status(200).send({ success: true });
});

/**
 * @async
 * @desc accept a verify request
 * @route PACTH /api/verify/:id
 * @access private
 */
const verifyUser = asyncHandler(async (req, res) => {
  if (req.user.role === 'admin') {
    const user = await User.findById(req.params.id);
    if (user.role === 'instructor') user.verified = true;
    await user.save();
    res.status(200).send({ success: true, data: user });
  } else {
    res.status(400).send({
      success: false,
      message: `${req.user._id} is not authorised to verify the ID`,
    });
  }
});

// eslint-disable-next-line import/prefer-default-export
export { createRequest, getRequests, deleteRequest, verifyUser };
