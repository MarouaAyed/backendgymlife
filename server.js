const express = require("express");
const router = express.Router();
const passport = require("passport");

const cors = require("cors");
const { success, error } = require("consola");
require("dotenv").config();

const db = require("./Config/database");
const PORT = process.env.APP_PORT;

const authrouter = require("./Routes/authrouter");
const adminrouter = require("./Routes/adminrouter");
const userrouter = require("./Routes/userrouter");
const planrouter = require("./Routes/planrouter");
const regimerouter = require("./Routes/regimerouter");


// Initialize the application
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/api", router);

router.use("/", authrouter);
router.use("/admin", adminrouter);
router.use("/user", userrouter);
router.use("/plan", planrouter);
router.use("/regime", regimerouter);

// Start Listenting for the server on PORT
app.listen(PORT, async () => {
	try {
		success({
			message:
				`Server started on PORT ${PORT} ` + `URL : http://localhost:${PORT}`,
			badge: true,
		});
	} catch (err) {
		error({ message: "error with server", badge: true });
	}
});
