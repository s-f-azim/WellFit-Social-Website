import { Server as Socketio } from 'socket.io';
import app from './app.js';
import socketEvents from './socketsEvents.js';

// setup port 4000 or the port in env
const port = process.env.PORT || 4000;

// create server
// eslint-disable-next-line import/no-mutable-exports
const server = app.listen(port, console.log(`Server is up on port ${port}`));
const io = new Socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  },
});
socketEvents(io);
// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit
  server.close(() => process.exit(1));
});

export default server;
