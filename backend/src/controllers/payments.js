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
  /* eslint-disable camelcase*/
  const { line_items, courseId } = req.body;
  console.log('hmm');
  const id = await createStripeCheckOutSession(line_items, req.user, courseId);
  res.status(200).send({ success: true, id });
});

export default checkout;
