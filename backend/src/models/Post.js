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
  let post = this;
  post.model('User').update(
    {favourites: { $in: [post._id] }},
    {$pull: { favourites: post._id }},
    {multi: true}
  );
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
