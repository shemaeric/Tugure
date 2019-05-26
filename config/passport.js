import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

dotenv.config();


passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true
    },
    async (req, jwtPayload, done) => {
      try {
        return done(null, jwtPayload);
      } catch (err) {
        return done(null, false, { message: 'user does not exist' });
      }
    }
  )
);
