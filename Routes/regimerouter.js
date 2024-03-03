const router = require("express").Router();
const regimecontroller = require("../Controllers/regimeController");
const check_auth = require("../Middlewares/check_authentication");

router.post("/create", regimecontroller.createRegime);

router.post("/getRegimeAdherent/:id", regimecontroller.getRegimeAdherent);

router.get("/getRegime",check_auth, regimecontroller.getRegime);

module.exports = router;
