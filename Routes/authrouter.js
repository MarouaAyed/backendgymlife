const router = require("express").Router();
const authentification = require("../Controllers/authentificationController");
const upload = require("../Middlewares/upload");
const check_auth = require("../Middlewares/check_authentication");

const passport = require("passport");
require("../Middlewares/passport_authentification").passport; // as strategy in passport_authentification.js needs passport object

/* 

passport.authenticate("jwt", {
		session: false,
	}),
*/
router.post("/registerAdmin", authentification.registerAdmin);
router.post("/register", upload.single("photo"), authentification.register);

router.post("/login", authentification.login);

router.get(
	"/refreshtoken",
	passport.authenticate("jwt", { session: false }),
	authentification.refreshToken
);

router.post("/changePassword", check_auth, authentification.changePassword);

module.exports = router;
