import asyncHandler from '../middleware/async.js';
import Request from '../models/Course.js';

/**
 * @async
 * @desc create a request
 * @route POST /api/requests/create
 * @access private
 */
const createRequest = asyncHandler(async (req, res) => {
  const request = await Request.create({
    author: req.params.user,
    type: req.params.type,
    content: req.params.content,
  });
  res.status(200).send({ success: true, data: { request } });
});

// eslint-disable-next-line import/prefer-default-export
export { createRequest };
