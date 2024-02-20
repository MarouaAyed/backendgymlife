const router = require('express').Router();
const authentification = require('../Controllers/authentificationController');
const passport = require('passport');
require('../Middlewares/passport_admin').passport; 



module.exports = router;