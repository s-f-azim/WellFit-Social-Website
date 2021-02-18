import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "./src/models/User.js";

//JWT strategy
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        //find the user specified in the token
        const user = await User.findById(payload.sub);
        // if the user does't exists return
        if (!user) return done(null, false);
        //otherwise , return the user
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

export default passport;
