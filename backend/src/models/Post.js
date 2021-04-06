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
    videoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

PostSchema.pre('remove', (next) => { //remove favourites from user if post deleted
  this.model('User').update(
    {favourites: { $in: [this._id] }},
    {$pull: { favourites: this._id }},
    {multi: true},
    next);
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
