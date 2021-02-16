import express from "express";
import connectDb from "../config/db.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";

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

//setup middleware
app.use(errorHandler);

export default app;
