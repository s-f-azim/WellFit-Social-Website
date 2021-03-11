import asyncHandler from '../middleware/async.js';
import Request from '../models/Request.js';

/**
 * @async
 * @desc create a request
 * @route POST /api/requests/create
 * @access private
 */
const createRequest = asyncHandler(async (req, res) => {
  console.log('something');
  const request = await Request.create({
    author: req.user._id,
    type: req.body.type,
    content: req.body.content,
  });
  res.status(200).send({ success: true, data: request });
});

// eslint-disable-next-line import/prefer-default-export
export { createRequest };
