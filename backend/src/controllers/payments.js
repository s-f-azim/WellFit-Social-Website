import createStripeCheckOutSession from '../utils/stripe/checkout.js';
import asyncHandler from '../middleware/async.js';

/**
 * @async
 * @desc checkout process using stripe
 * @route POST /api/payment/checkout
 * @access private
 */
const checkout = asyncHandler(async (req, res) => {
  /* eslint-disable camelcase */
  const { line_items, courseId } = req.body;
  const id = await createStripeCheckOutSession(line_items, req.user, courseId);
  res.status(200).send({ success: true, id });
});

export default checkout;
