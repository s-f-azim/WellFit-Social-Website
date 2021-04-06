/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import CourseReview from '../models/CourseReview.js';
import Course from '../models/Course.js';

/**
 * @async
 * @desc create a review for a course
 * @route POST /api/courses/:id/reviews
 * @access private
 */
const createCourseReview = asyncHandler(async (req, res) => {
  let review = await CourseReview.create({
    author: req.user._id,
    course: req.params.id,
    ...req.body,
  });
  review = await review.populate('author', 'fName lName photos').execPopulate();

  return res.status(200).json({ success: true, data: review });
});

/**
 * @async
 * @desc get all reviews of a course
 * @route GET /api/courses/:id/reviews
 * @access public
 */
const getCourseReviews = asyncHandler(async (req, res) => {
  Course.findById(req.params.id, 'reviews')
    .populate({
      path: 'reviews',
      populate: { path: 'author', select: 'fName lName photos' },
    })
    .exec((err, course) => {
      if (err) return res.status(400).json({ success: false });
      return res.status(200).json({ success: true, data: course.reviews });
    });
});

/**
 * @async
 * @desc delete a review
 * @route DELETE /api/courses/:id/reviews
 * @access private
 */
const deleteCourseReview = asyncHandler(async (req, res) => {
  CourseReview.findOneAndDelete(
    {
      author: req.user._id,
      course: req.params.id,
    },
    (err) => {
      if (err) return res.status(400).send({ success: false });
      return res.status(200).send({ success: true });
    }
  );
});

export { createCourseReview, getCourseReviews, deleteCourseReview };
