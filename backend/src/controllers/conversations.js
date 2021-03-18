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
 * @route GET /api/conversations/:user
 * @access private
 */
const getConversation = asyncHandler(async (req, res) => {
  // const { users } = req.params;
  const users = req.params.users.split(',');
  console.log(users);

  users.push(req.user._id);
  const conversation = await Conversation.findOne({
    users: { $all: [...users] },
  }).populate('messages');

  res.status(200).send({ success: true, data: conversation });
});

/**
 * @async
 * @desc get all conversations of the current user
 * @route GET /api/conversations/me?limit=number&&page=number
 * @access private
 */
const getConversations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const total = await Conversation.find({ users: { $all: [req.user._id] } });
  const conversations = await Conversation.find({
    users: { $all: [req.user._id] },
  })
    .skip(startIndex)
    .limit(limit)
    .populate('messages');

  res.status(200).send({
    success: true,
    data: conversations,
    pagination: { total: total.length },
  });
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

export {
  createConversation,
  getConversation,
  updateConversation,
  getConversations,
};
