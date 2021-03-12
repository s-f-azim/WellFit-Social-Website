import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    reviewed: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    reviewer: {
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
  { timestamps: true }
);

ReviewSchema.index({ reviewed: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
