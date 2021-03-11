import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please enter the author of the request'],
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['verify', 'bug', 'message', 'report'],
      required: [true, 'Please select a request type'],
    },
    content: {
      type: String,
      required: [true, 'Please add a request'],
    },
  },
  { timestamps: true }
);

// create request model
const Request = mongoose.model('Request', RequestSchema);

export default Request;
