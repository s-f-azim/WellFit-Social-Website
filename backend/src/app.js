import express from "express";
import connectDb from "../config/db.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";
import ErrorResponse from "./utils/errorResponse.js";
import userRoutes from "./routes/user.js";
//connect to the database
connectDb();

//create the app and setup
const app = express();
app.use(express.json());

//cors
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes
app.use("/api/users", userRoutes);

//404 if the route doesn't match
app.all("*", (_, res) => {
  throw new ErrorResponse("Resource not found on this server", 404);
});
//setup middleware
app.use(errorHandler);

export default app;
