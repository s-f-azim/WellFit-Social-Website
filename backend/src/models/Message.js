import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please add a message'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Message must have an author'],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
