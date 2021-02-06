import express from "express";
import connectDb from "../config/db.js";
import errorHandler from "./middleware/error.js";

//connect to the database
connectDb();

//create the app and setup
const app = express();
app.use(express.json());

//routes

//setup middleware
app.use(errorHandler);

export default app;
