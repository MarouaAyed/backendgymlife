const router = require("express").Router();
const usercontroller = require("../Controllers/userController");
const check_auth = require("../Middlewares/check_authentication");

const passport = require("passport");
require("../Middlewares/passport_authentification").passport;

router.get("/getCoachs", usercontroller.getCoachs);

router.get("/getAllUsers", usercontroller.getAllUsers);

/*  router.get(
	"/getAdherentsCoach",
	passport.authenticate("jwt", { session: false }),
	usercontroller.getAdherentsCoach
);  */

router.get("/getAdherentsCoach", check_auth, usercontroller.getAdherentsCoach);

module.exports = router;
