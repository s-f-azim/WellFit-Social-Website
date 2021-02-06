import app from "./app.js";

//setup port 3000 or the port in env
const port = process.env.PORT || 4000;

//start server
const server = app.listen(port, console.log(`Server is up on port ${port}`));

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit
  server.close(() => process.exit(1));
});
