import fs from 'fs';
import { Server as Socketio } from 'socket.io';
import https from 'https';
import http from 'http';
import path from 'path';
import app from './app.js';
import socketEvents from './socketsEvents.js';

// setup port 4000 or the port in env
const port = process.env.PORT || 4000;

// create server
// eslint-disable-next-line import/no-mutable-exports
let server = http.createServer(app);

if (process.env.NODE_ENV === 'PRODUCTION') {
  const key = fs.readFileSync(path.join(path.resolve(), 'key.pem'));
  const cert = fs.readFileSync(path.join(path.resolve(), 'cert.pem'));
  server = https.createServer({ key, cert }, app);
  server.listen(port, console.log(`Server is up on port ${port}`));
} else {
  server = app.listen(port, console.log(`Server is up on port ${port}`));
}
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
