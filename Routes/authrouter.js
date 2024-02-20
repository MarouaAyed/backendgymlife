const router = require("express").Router();
const authentification = require("../Controllers/authentificationController");
const upload = require("../Middlewares/upload");

const passport = require("passport");
require("../Middlewares/passport_authentification").passport; // as strategy in passport_authentification.js needs passport object

/* 

passport.authenticate("jwt", {
		session: false,
	}),
*/
router.post("/registerAdmin", authentification.registerAdmin);
router.post(
	"/register",
	upload.single("photo"),
	authentification.register
);

router.post("/login", authentification.login);

router.get(
	"/refreshtoken",
	passport.authenticate("jwt", { session: false }),
	authentification.refreshToken
);

router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	authentification.profile
);

module.exports = router;
