import express from 'express';
import {
  createRequest,
  getRequests,
  deleteRequest,
} from '../controllers/requests.js';
import passport from '../../config/passport-setup.js';
import paginate from '../middleware/paginate.js';
import Request from '../models/Request.js';

const router = new express.Router();

router.route('/').get(paginate(Request), getRequests);

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createRequest);

router
  .route('/delete/:id')
  .delete(passport.authenticate('jwt', { session: false }), deleteRequest);

export default router;
