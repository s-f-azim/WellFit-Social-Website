import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../src/models/User.js";

// get the cookie out of the request
const cookieExtractor = (req) => {
  const jwt = req && req.cookies ? req.cookies["token"] : null;
  return jwt;
};

//JWT strategy
passport.use(
  new Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        //find the user specified in the token
        const user = await User.findById(payload.id);
        // if the user does't exists return
        if (!user) return done(null, false);
        //otherwise , return the user
        req.user = user;

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

export default passport;
