/* eslint-disable no-use-before-define */
import asyncHandler from '../middleware/async.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

/**
 * @async
 * @desc create a post
 * @route POST /api/posts
 * @access private
 */
const createPost = asyncHandler(async (req, res) => {
  let post = await Post.create({
    author: req.user._id,
    ...req.body,
  });
  post = await post.populate('author', 'fName lName').execPopulate();
  return res.status(200).send({ success: true, data: post });
});

/**
 * @async
 * @desc get posts by author
 * @route GET /api/posts/author/:authorId
 * @access public
 */
const getPostsByAuthor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.authorId, 'posts').populate({
    path: 'posts',
    options: { sort: { createdAt: -1 } },
    populate: { path: 'author', select: 'fName lName' },
  });
  res.status(200).json({ success: true, data: user.posts });
});

/**
 * @async
 * @desc get posts of user and following users sorted by creation date
 * @route GET /api/posts/feed
 * @access public
 */
const getFeedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, 'following');

  const posts = await Post.find({
    $or: [{ author: req.user._id }, { author: { $in: user.following } }],
  })
    .populate('author', 'fName lName')
    .sort('-createdAt');

  res.status(200).json({ success: true, data: posts });
});

/**
 * @async
 * @desc delete a post
 * @route DELETE /api/posts/:id
 * @access private
 */
const deletePost = asyncHandler(async (req, res) => {
  await Post.findOneAndDelete(
    { _id: req.params.id, author: req.user._id },
    (err, post) => {
      if (!post) return res.status(400).send({ success: false });
      return res.status(200).send({ success: true });
    }
  );
});

export { createPost, getPostsByAuthor, getFeedPosts, deletePost };
