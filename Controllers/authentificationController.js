const User = require("../Models/User");
const Plan = require("../Models/Plan");

const bcrypt = require("bcrypt");
const generatePassword = require("generate-password");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET = process.env.APP_SECRET;
var RefreshTokens = [];

var transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "3a831bd911cb6e",
		pass: "0eab54ec92b4c6",
	},
});

registerAdmin = async (req, res) => {
	try {
		const password = bcrypt.hashSync(req.body.password, 10);

		const admin = new User({
			...req.body,
			password,
			role: "admin",
		});

		await admin.save();
		res.status(201).json({
			status: 201,
			message: "Hurray! your account admin is created.",
		});
	} catch (err) {
		res.status(406).json({
			status: 406,
			message: err.message,
		});
	}
};

register = async (req, res) => {
	try {
		req.body["picture"] = !req.file ? null : req.file.filename;
		//console.log(req);
		// Générer un mot de passe aléatoire avec le package generate-password
		const randomPassword = generatePassword.generate({
			length: 12, // Choisir la longueur souhaitée
			numbers: true,
			symbols: true,
			uppercase: true,
			excludeSimilarCharacters: true,
		});

		// Hacher le mot de passe avec bcrypt
		const password = bcrypt.hashSync(randomPassword, 10);

		console.log("Mot de passe aléatoire:", randomPassword);
		console.log("Mot de passe haché:", password);

		const coachId = req.body.coach || null;

		const newuser = new User({
			...req.body,
			password,
			coach: coachId,
		});
		if (req.body.plan) {
			const plan = await Plan.findById(req.body.plan).select("validity_days");

			const validityDays = plan.validity_days;
			const startDate = new Date();

			// Créer une copie de la date de début pour éviter de modifier directement la date d'origine
			const endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + validityDays);

			newuser.subscription.push({
				plan: req.body.plan,
				start_date: startDate,
				end_date: endDate,
			});
		}

		const user = await newuser.save();
		console.log("req.body.coach ", req.body.coach);
		if (req.body.coach) {
			const coach = await User.findById({ _id: req.body.coach });
			await coach.adherents.push(user._id);
			await coach.save();
		}

		transport.sendMail(
			{
				to: user.email,
				subject: "Welcome " + user.fullname,
				text: "bonjour mr ",
				html: `<!DOCTYPE html>
						<html>
						<head>
						<meta charset="utf-8">
						<meta http-equiv="x-ua-compatible" content="ie=edge">
						<title>Welcome Email</title>
						</head>
						<body>
						<h2>Hello ${user.fullname}! </h2>
						<p>We're glad to have you on board at ${user.email}. </p>
						<p>Your password is ${randomPassword} , Modify it for enhanced security. </p>
						<a href="">thank you for joining our platform</a>
						</body>
						</html>`,
			},
			function (err, info) {
				if (err) {
					console.log("error : ", err);
				} else {
					console.log("Email sent : ", info.response);
				}
			}
		);
		res.status(201).json({
			status: 201,
			message: "Welcome! your account is created.",
		});
	} catch (err) {
		console.log("error catch ", err.message);
		res.status(406).json({
			status: 406,
			message: err.message,
		});
	}
};

login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			email,
		});
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: "email not found !",
			});
		}
		if (user.active === true) {
			const passwordCompare = bcrypt.compareSync(password, user.password);
			if (!passwordCompare) {
				return res.status(404).json({
					status: 404,
					message: "password Incorrect !",
				});
			}
			const token = jwt.sign(
				{
					id: user._id,
					user: user,
				},
				SECRET,
				{
					expiresIn: "7 days",
				}
				/*  { expiresIn: '24h' } */
			);

			const refreshToken = jwt.sign(
				{
					id: user._id,
				},
				SECRET,
				{
					expiresIn: "24h",
				}
			);

			RefreshTokens[refreshToken] = user._id;

			const result = {
				email: user.email,
				user: user,
				token: token,
				expiresIn: 1,
				refreshToken: refreshToken,
			};

			return res.status(200).json({
				...result,
				message: "Hurray! You are now logged in.",
				success: true,
			});
		} else {
			return res.status(200).json({
				message: "Hurray! You are not actived",
				success: false,
			});
		}
	} catch (error) {
		res.status(404).json({
			status: 404,
			message: error.message,
		});
	}
};

refreshToken = async (req, res) => {
	try {
		const refreshToken = req.body.refreshToken;
		if (refreshToken in RefreshTokens) {
			const token = jwt.sign({ id: req.user._id }, SECRET, { expiresIn: "7h" });
			const refreshToken = jwt.sign(
				{
					id: req.user._id,
				},
				SECRET,
				{
					expiresIn: "24h",
				}
			);

			RefreshTokens[refreshToken] = req.user._id;
			res.status(200).json({
				accesstoken: token,
				refreshToken: refreshToken,
			});
		} else {
			res.status(404).json({
				status: 404,
				message: "refresh token is not defined !! ",
			});
		}
	} catch (error) {
		res.status(404).json({
			status: 404,
			message: error.message,
		});
	}
};
forgetPassword = async (req, res) => {};
resetPassword = async (req, res) => {};

changePassword = async (req, res) => {
	try {
		const auth_user = req.user;
		//console.log("auth_user ", auth_user);
		const user = await User.findOne({ _id: auth_user._id });
		const passwordCompare = bcrypt.compareSync(
			req.body.oldPasswordValue,
			user.password
		);
		if (passwordCompare) {
			const password = bcrypt.hashSync(req.body.newPasswordValue, 10);
			user.password = password;
			user.save();
			res.status(200).json({
				status: 200,
				message: "Password changed successufuly.",
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "Password not found.",
			});
		}
	} catch (error) {
		console.log("error catch ", err.message);
		res.status(406).json({
			status: 406,
			message: err.message,
		});
	}
};

module.exports = {
	registerAdmin,
	register,
	login,
	refreshToken,
	forgetPassword,
	resetPassword,
	changePassword,
};
