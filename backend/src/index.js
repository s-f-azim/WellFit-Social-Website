import app from "./app.js";
import fs from "fs";
import https from "https";
import path from "path";

//setup port 4000 or the port in env
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "PRODUCTION") {
  const key = fs.readFileSync(path.join(path.resolve(), "key.pem"));
  const cert = fs.readFileSync(path.join(path.resolve(), "cert.pem"));
  const server = https.createServer({ key: key, cert: cert }, app);
  server.listen(port, console.log(`Server is up on port ${port}`));
} else {
  const server = app.listen(port, console.log(`Server is up on port ${port}`));
}
//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit
  server.close(() => process.exit(1));
});
