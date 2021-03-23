import createStripeCheckOutSession from '../utils/stripe/checkout.js';
import asyncHandler from '../middleware/async.js';

/**
 * @async
 * @desc checkout procces using stripe
 * @route POST /api/payment/checkout
 * @access private
 */
const checkout = asyncHandler(async (req, res) => {
  // console.log('hey');
  const { line_items } = req.body;
  const response = await createStripeCheckOutSession(line_items, req.user);
  res.status(200).send({ success: true, data: response });
});

export default checkout;
