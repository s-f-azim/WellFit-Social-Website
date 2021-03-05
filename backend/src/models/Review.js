import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    _id: false,

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
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ reviewed: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model('User', ReviewSchema);

export default Review;
