import mongoose from 'mongoose';
import Review from './Review.js';

const CourseReviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
  },
});

CourseReviewSchema.index({ author: 1, course: 1 }, { unique: true });

const CourseReview = Review.discriminator('CourseReview', CourseReviewSchema);
CourseReview.ensureIndexes();

export default CourseReview;
