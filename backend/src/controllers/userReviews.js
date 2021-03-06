/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import UserReview from '../models/UserReview.js';
import User from '../models/User.js';

/**
 * @async
 * @desc create a review for another user
 * @route POST /api/users/:id/reviews
 * @access private
 */
const createUserReview = asyncHandler(async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res.status(400).send({ error: 'Please do not review yourself' });
  }

  let review = await UserReview.create({
    author: req.user._id,
    user: req.params.id,
    ...req.body,
  });
  review = await review.populate('author', 'fName lName photos').execPopulate();

  return res.status(200).send({ success: true, data: review });
});

/**
 * @async
 * @desc get all reviews of a user
 * @route GET /api/users/:id/reviews
 * @access public
 */
const getUserReviews = asyncHandler(async (req, res) => {
  User.findById(req.params.id, 'reviews')
    .populate({
      path: 'reviews',
      populate: { path: 'author', select: 'fName lName photos' },
    })
    .exec((err, user) => {
      if (err) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true, data: user.reviews });
    });
});

/**
 * @async
 * @desc delete a review
 * @route DELETE /api/users/:id/reviews
 * @access private
 */
const deleteUserReview = asyncHandler(async (req, res) => {
  UserReview.findOneAndDelete(
    {
      author: req.user._id,
      user: req.params.id,
    },
    (err) => {
      if (err) return res.status(400).send({ success: false });
      return res.status(200).send({ success: true });
    }
  );
});

export { createUserReview, getUserReviews, deleteUserReview };
