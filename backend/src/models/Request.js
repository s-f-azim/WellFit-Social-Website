import mongoose from 'mongoose';

// helper validation function
function isReport() {
  return this.type === 'report';
}
const RequestSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please enter the author of the request'],
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['verify', 'bug', 'report'],
      required: [true, 'Please select a request type'],
    },
    // recipient is only required for type report
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: [isReport, 'Please enter a recipient'],
      ref: 'User',
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
