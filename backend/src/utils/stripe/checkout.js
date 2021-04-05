import stripe from './index.js';
import Course from '../../models/Course.js';

/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const createStripeCheckoutSession = async (line_items, user, courseId) => {
  // this is so the user can't manually enter the price on the client side
  const course = await Course.findById(courseId);
  line_items[0].amount = course.price * 100;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/fail`,
    customer_email: user.email,
  });
  return session.id;
};

export default createStripeCheckoutSession;
