const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../Models/User');
const passport = require('passport');
const SECRET = process.env.APP_SECRET;

// pour choisir format token
var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new Strategy(options, async ({ id }, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found.');
      }
      if (user.role==="admin") {
        //console.log(user);
      return done(null, user);
      } else {
        throw new Error('your role not admin.');
      }
    } catch (error) {
      done(null, false);
      //console.log(error.message);
    }
  })
);
