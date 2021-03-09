/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

/**
 * @async
 * @desc create a review for another user
 * @route POST /api/users/review/:id
 * @access private
 */
const createReview = asyncHandler(async (req, res) => {
  if (req.user._id.toString() === req.params.reviewedId) {
    return res.status(400).send({ error: 'Please do not review yourself' });
  }

  let review = await Review.create({
    reviewed: req.params.reviewedId,
    reviewer: req.user._id,
    ...req.body,
  });
  review = await review.populate('reviewer').execPopulate();

  return res.status(200).send({ success: true, data: { review } });
});

/**
 * @async
 * @desc get user profile
 * @route GET /api/users/profile
 * @access public
 */
const getReviews = asyncHandler(async (req, res) => {
  User.findById(req.params.reviewedId, 'reviews')
    .populate({
      path: 'reviews',
      populate: { path: 'reviewer' },
    })
    .exec((err, user) => {
      res.status(200).json({ success: true, data: { reviews: user.reviews } });
    });
});

/**
 * @async
 * @desc delete a review
 * @route DELETE /api/users/review/:id
 * @access private
 */
const deleteReview = asyncHandler(async (req, res) => {
  Review.findOneAndDelete(
    {
      reviewed: req.params.reviewedId,
      reviewer: req.user._id,
    },
    (err) => {
      if (err) res.status(400).send({ success: false });
      res.status(200).send({ success: true });
    }
  );
});

export { createReview, getReviews, deleteReview };
