/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import Review from '../models/Review.js';

/**
 * @async
 * @desc create a review for another user
 * @route POST /api/users/review/:id
 * @access private
 */
const createReview = asyncHandler(async (req, res) => {
  if (req.user._id.toString() === req.params.userId) {
    return res.status(400).send({ error: 'Please do not review yourself' });
  }

  const review = await Review.create({
    reviewed: req.params.reviewedId,
    reviewer: req.user._id,
    ...req.body,
  });
  return res.status(200).send({ success: true, data: { review } });
});

/**
 * @async
 * @desc get user profile
 * @route GET /api/users/profile
 * @access public
 */
const getReviews = asyncHandler(async (req, res) => {
  /* User.findById(req.params.id, 'reviews', (err, user) => {
    res.status(200).json({ success: true, data: { reviews: user.reviews } });
  }); */
});

/**
 * @async
 * @desc delete a review
 * @route DELETE /api/users/review/:id
 * @access private
 */
const deleteReview = asyncHandler(async (req, res) => {
  /* await User.findByIdAndUpdate(req.params.id, {
    $pull: {
      reviews: {
        author: req.user,
      },
    },
  });

  res.status(200).send({ success: true }); */
});

export { createReview, getReviews, deleteReview };
