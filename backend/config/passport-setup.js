import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import User from '../src/models/User.js';

// get the cookie out of the request
const cookieExtractor = (req) => {
  const jwt = req && req.cookies ? req.cookies.token : null;
  return jwt;
};

// setup passport

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// JWT strategy
passport.use(
  new Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    // eslint-disable-next-line consistent-return
    async (req, payload, done) => {
      try {
        // find the user specified in the token
        const user = await User.findById(payload.id);
        // if the user does't exists return
        if (!user) return done(null, false);
        // otherwise , return the user
        req.user = user;

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);
if (process.env.NODE_ENV !== 'TEST') {
  // Google oauth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_API_URL}/users/oauth/google/redirect`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({ googleId: profile.id });
        // check if the person has logged with google before
        if (currentUser) {
          done(null, currentUser);
        } else {
          await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
          });
        }
      },
    ),
  );
  // Instagram oauth strategy
  passport.use(
    new InstagramStrategy(
      {
        clientID: process.env.INSTA_CLIENT_ID,
        clientSecret: process.env.INSTA_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_API_URL}/users/oauth/instagram/redirect`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({ instaID: profile.id });
        // check if the person has logged with google before
        if (currentUser) {
          done(null, currentUser);
        } else {
          await User.create({
            instaId: profile.id,
            email: profile.emails[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
          });
        }
      },
    ),
  );
  // Facebook oauth strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_API_URL}/users/oauth/facebook/redirect/`,
        profileFields: ['email', 'name'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({ facebookId: profile.id });
        // check if the person has logged with google before
        if (currentUser) {
          done(null, currentUser);
        } else {
          const { email, first_name: firstName, last_name: lastName } = profile._json;
          await User.create({
            facebookId: profile.id,
            email,
            name: `${firstName} ${lastName}`,
          });
        }
      },
    ),
  );
}
export default passport;
