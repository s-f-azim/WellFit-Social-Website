let users = {};
const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('we have a new connection');
    socket.emit('online', { message: 'hey' });

    socket.on('disconnect', () => {
      console.log('User had left!');
    });
  });
};

export default socketEvents;
