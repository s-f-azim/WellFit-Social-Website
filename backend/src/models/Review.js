import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    rate: {
      type: Number,
      required: [true, 'Please add a rating'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { discriminatorKey: 'kind', timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
