import Conversation from './models/Conversation.js';
import Message from './models/Message.js';
// let users = {};
const socketEvents = (io) => {
  io.on('connection', (socket) => {
    // on send message create a new message and add it to the conversation
    socket.on('Send message', async (msg) => {
      const { author, message, conversationId } = msg;
      const newMessage = await Message.create({ author, content: message });
      const conversation = await Conversation.findById(conversationId);
      conversation.messages = [...conversation.messages, newMessage];
      await conversation.save();
      // send the message to the client side
      io.sockets.emit('message', newMessage);
    });
    // when the user leave
    socket.on('disconnect', () => {});
  });
};

export default socketEvents;
