import express from 'express';
import { createRequest } from '../controllers/requests.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router();

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createRequest);

export default router;
