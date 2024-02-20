const jwt = require("jsonwebtoken");
const SECRET = process.env.APP_SECRET;

check_auth = async (req, res, next) => {
	try {
		const token = req.headers["authorization"];

		if (!token) {
			return res.status(403).json({ message: "No token" });
		}

		//pour verifier date d'expiration de token et recuperer user
		jwt.verify(token, SECRET, (err, decoder) => {
			if (err) {
				if (err.name === "JsonWebTokenError") {
					return res
						.status(401)
						.json({ status: 401, message: "Invalid token" });
				} else if (err.name === "TokenExpiredError") {
					return res
						.status(401)
						.json({ status: 401, message: "Token expired" });
				} else {
					return res
						.status(401)
						.json({ status: 401, message: "Authentication failed" });
				}
			}
			//   console.log(decoder);
			req.user = decoder.user;
			next();
		});
	} catch (error) {
		res.status(404).json({ message: "Auth failed catch / " + error.message });
	}
};

module.exports = check_auth;
