const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../Models/User");
const passport = require("passport");
const SECRET = process.env.APP_SECRET;

// pour choisir format token
var options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET,
};

passport.use(
	new Strategy(options, async ({ id }, done) => {
		try {
			console.log("Now in middleware");
			const user = await User.findById(id);
			if (!user) {
				console.error("User not found for ID:", id);
				return done(null, false);
			}
			console.log("User found:", user);
			return done(null, user);
		} catch (error) {
			console.error("Error in middleware:", error.message);
			return done(null, false);
		}
	})
);
