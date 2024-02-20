const router = require("express").Router();
const plancontroller = require("../Controllers/planController");
const upload = require("../Middlewares/upload");

const passport = require("passport");
require("../Middlewares/passport_admin").passport;

router.post("/create", upload.single("photo"), plancontroller.createPlan);

/* 
	passport.authenticate("jwt", {
		session: false,
	}),
 */

router.get("/getAll", plancontroller.getAllPlans);

router.post("/getActive", plancontroller.getActive);

router.post(
	"/getById",
	passport.authenticate("jwt", {
		session: false,
	}),
	plancontroller.getPlanById
);

router.post(
	"/search",
	passport.authenticate("jwt", {
		session: false,
	}),
	plancontroller.searchPlan
);

router.post(
	"/update/:id",
	plancontroller.updatePlan
);

router.post(
	"/changeState/:id",
	plancontroller.changeStatePlan
);

module.exports = router;
