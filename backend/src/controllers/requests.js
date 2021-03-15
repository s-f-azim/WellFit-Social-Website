import asyncHandler from '../middleware/async.js';
import Request from '../models/Request.js';

/**
 * @async
 * @desc create a request
 * @route POST /api/requests/create
 * @access private
 */
const createRequest = asyncHandler(async (req, res) => {
  console.log(`HIER IST DAS RECIPEITNET DING : ${req.body.recipientID}`);
  const request = await Request.create({
    author: req.user._id,
    type: req.body.type,
    content: req.body.content,
    recipient: req.body.recipientID,
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
 * @route DELETE /api/requests/delete/:id
 *
 */
const deleteRequest = asyncHandler(async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.status(200).send({ success: true });
});

// eslint-disable-next-line import/prefer-default-export
export { createRequest, getRequests, deleteRequest };
