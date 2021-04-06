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
    conversation: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation',
      required: [true, 'Message must have a conversation id to be sent to'],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
