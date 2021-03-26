import express from 'express';
import {
  createPost,
  getPostsByAuthor,
  getFeedPosts,
  deletePost,
} from '../controllers/posts.js';
import passport from '../../config/passport-setup.js';

const router = new express.Router({ mergeParams: true });

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), createPost);

router.route('/author/:authorId').get(getPostsByAuthor);

router
  .route('/feed')
  .get(passport.authenticate('jwt', { session: false }), getFeedPosts);

router
  .route('/:id')
  .delete(passport.authenticate('jwt', { session: false }), deletePost);

export default router;
