import asyncHandler from '../middleware/async.js';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

/**
 * @async
 * @desc create a new conversation given the ids
 * @route POST /api/conversations/
 * @access private
 */
const createConversation = asyncHandler(async (req, res) => {
  req.body.users.push(req.user._id);
  const conversation = await Conversation.create({
    users: [...req.body.users],
  });
  res.status(201).send({ success: true, data: conversation });
});

/**
 * @async
 * @desc get a conversation given the ids
 * @route GET /api/conversations/
 * @access private
 */
const getConversation = asyncHandler(async (req, res) => {
  req.body.users.push(req.user._id);
  const conversation = await Conversation.findOne({
    users: { $all: [...req.body.users] },
  }).populate('messages');

  res.status(200).send({ success: true, data: conversation });
});

/**
 * @async
 * @desc update conversation with new messages
 * @route PATCH /api/conversations/
 * @access private
 */
const updateConversation = asyncHandler(async (req, res) => {
  req.body.users.push(req.user._id);
  const conversation = await Conversation.findOne({
    users: { $all: [...req.body.users] },
  })
    .populate('messages')
    .populate('users');
  const message = await Message.create({
    author: req.user._id,
    content: req.body.message.content,
  });
  conversation.messages = [...conversation.messages, message];
  await conversation.save();
  res.status(200).send({ success: true, data: conversation });
});

export { createConversation, getConversation, updateConversation };
