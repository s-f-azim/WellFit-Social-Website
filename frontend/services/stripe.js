import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from '../config';

const stripePromise = loadStripe(STRIPE_KEY);

export default stripePromise;
