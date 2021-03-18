import express from 'express';
import {
  createConversation,
  getConversation,
  updateConversation,
  getConversations,
} from '../controllers/conversations.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createConversation)
  .patch(passport.authenticate('jwt', { session: false }), updateConversation);

router
  .route('/me')
  .get(passport.authenticate('jwt', { session: false }), getConversations);

router
  .route('/:users')
  .get(passport.authenticate('jwt', { session: false }), getConversation);
export default router;
