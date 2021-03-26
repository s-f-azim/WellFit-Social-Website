import mongoose from 'mongoose';
import Review from './Review.js';

const UserReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

UserReviewSchema.index({ author: 1, user: 1 }, { unique: true });

const UserReview = Review.discriminator('UserReview', UserReviewSchema);
UserReview.ensureIndexes();

export default UserReview;
