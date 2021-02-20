import express from "express";
import connectDb from "../config/db.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorResponse from "./utils/errorResponse.js";
import userRoutes from "./routes/user.js";
import passport from "../config/passport-setup.js";
import santanize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
// connect to the database
connectDb();

// create the app and setup
const app = express();
app.use(express.json());

// cookie parser
app.use(cookieParser());

// santanize data
app.use(santanize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// passport setup
app.use(passport.initialize());

// cors
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes
app.use("/api/users", userRoutes);

// 404 if the route doesn't match
app.all("*", (_, res) => {
  throw new ErrorResponse("Resource not found on this server", 404);
});
//setup middleware
app.use(errorHandler);

export default app;
