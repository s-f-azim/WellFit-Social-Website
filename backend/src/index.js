import fs from 'fs';
import https from 'https';
import path from 'path';
import app from './app';

// setup port 4000 or the port in env
const port = process.env.PORT || 4000;
let server;
if (process.env.NODE_ENV !== 'PRODUCTION') {
  const key = fs.readFileSync(path.join(path.resolve(), 'key.pem'));
  const cert = fs.readFileSync(path.join(path.resolve(), 'cert.pem'));
  server = https.createServer({ key, cert }, app);
  server.listen(port, console.log(`Server is up on port ${port}`));
} else {
  server = app.listen(port, console.log(`Server is up on port ${port}`));
}
// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit
  server.close(() => process.exit(1));
});
