import express from 'express';
import {
  createConversation,
  getConversation,
  updateConversation,
} from '../controllers/conversations.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createConversation)
  .get(passport.authenticate('jwt', { session: false }), getConversation)
  .patch(passport.authenticate('jwt', { session: false }), updateConversation);

export default router;
