import express from 'express';
import checkout from '../controllers/payments.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router();

router
  .route('/checkout')
  .post(passport.authenticate('jwt', { session: false }), checkout);

export default router;
