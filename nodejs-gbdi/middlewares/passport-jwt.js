const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const model = require('models/index');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, async function(jwtPayload, done) {
  try {
    const user = await model.User.findByPk(jwtPayload.userId);
    if (user) return done(null, user);
  } catch (error) {
    done(error);
  }
}));

module.exports.isLogin = passport.authenticate('jwt', { session: false });