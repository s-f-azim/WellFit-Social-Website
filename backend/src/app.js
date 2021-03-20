import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import santanize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import connectDb from '../config/db.js';
import errorHandler from './middleware/error.js';
import ErrorResponse from './utils/errorResponse.js';
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import userReviewRoutes from './routes/userReview.js';
import courseReviewRoutes from './routes/courseReview.js';
import postRoutes from './routes/post.js';
import requestRoutes from './routes/request.js';
import conversationRoutes from './routes/conversation.js';
import passport from '../config/passport-setup.js';

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

// compress all responses
app.use(compression());

// passport setup
app.use(passport.initialize());

// cors
app.use(cors({ credentials: true, origin: `${process.env.CLIENT_URL}` }));

// routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users/:id/reviews', userReviewRoutes);
app.use('/api/courses/:id/reviews', courseReviewRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/posts', postRoutes);

// 404 if the route doesn't match
// eslint-disable-next-line no-unused-vars
app.all('*', (_, res) => {
  throw new ErrorResponse('Resource not found on this server', 404);
});

// setup middleware
app.use(errorHandler);

export default app;
