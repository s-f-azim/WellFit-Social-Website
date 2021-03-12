import asyncHandler from '../middleware/async.js';
import Request from '../models/Request.js';

/**
 * @async
 * @desc create a request
 * @route POST /api/requests/create
 * @access private
 */
const createRequest = asyncHandler(async (req, res) => {
  const request = await Request.create({
    author: req.user._id,
    type: req.body.type,
    content: req.body.content,
  });
  res.status(200).send({ success: true, data: request });
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
 * @route DELETE /api/requests/delete
 *
 */
const deleteRequest = asyncHandler(async (req, res) => {
  console.log('controller');
  await Request.findByIdAndDelete(req.id);
  res.status(200).send({ success: true });
});

// eslint-disable-next-line import/prefer-default-export
export { createRequest, getRequests, deleteRequest };
