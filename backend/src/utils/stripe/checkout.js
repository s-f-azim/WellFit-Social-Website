import stripe from './index.js';

const createStripeCheckoutSession = async (line_items) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
  });
  return session;
};

export default createStripeCheckoutSession;
