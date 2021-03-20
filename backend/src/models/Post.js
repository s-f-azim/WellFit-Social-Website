import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: [true, 'Please add some content'],
    },
    youtubeLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
