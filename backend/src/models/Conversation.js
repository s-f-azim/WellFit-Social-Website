import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    messages: [
      { type: [mongoose.Schema.ObjectId], ref: 'Message', default: [] },
    ],
    users: [{ type: [mongoose.Schema.ObjectId], ref: 'User', default: [] }],
  },

  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
