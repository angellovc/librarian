import {Strategy, ExtractJwt} from 'passport-jwt';
import { JWT_SECRET } from '../../data/config';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

export default JwtStrategy
