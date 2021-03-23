import stripe from './index.js';

const createStripeCheckoutSession = async (line_items, user) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
    customer_email: user.email,
  });
  return session;
};

export default createStripeCheckoutSession;
