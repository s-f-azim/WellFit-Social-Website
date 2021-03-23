import createStripeCheckOutSession from '../utils/stripe/checkout.js';
import asyncHandler from '../middleware/async.js';

/**
 * @async
 * @desc checkout procces using stripe
 * @route POST /api/payment/checkout
 * @access private
 */
const checkout = asyncHandler(async (req, res) => {
  const { line_items } = req.body;
  const response = await createStripeCheckOutSession(line_items);
  res.status(200).send({ success: true, data: response });
});

export default checkout;
