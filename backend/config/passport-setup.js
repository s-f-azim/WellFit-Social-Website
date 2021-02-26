import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import User from "../src/models/User.js";

// get the cookie out of the request
const cookieExtractor = (req) => {
  const jwt = req && req.cookies ? req.cookies["token"] : null;
  return jwt;
};

// setup passport

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

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
// Google oauth strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_API_URL}/users/oauth/google/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({ googleId: profile.id });
      // check if the person has logged with google before
      if (currentUser) {
        done(null, currentUser);
      } else {
        const user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
        });
      }
    }
  )
);

export default passport;
