const User = require("../Models/User");

getCoachs = async (req, res) => {
	try {
		const listecoachs = await User.find({ role: "coach" });
		res.status(200).json(listecoachs);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

getAllUsers = async (req, res) => {
	try {
		const listeusers = await User.find({}).populate({
			path: "subscription.plan",
			model: "Plan", // Assurez-vous que le modèle Plan est correctement défini
		});
		res.status(200).json(listeusers);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

getAdherentsCoach = async (req, res) => {
	try {
		const user = req.user;
		console.log("user", user);
		const listeusers = await User.find({ coach: user._id }).populate(
			"subscription.plan"
		);
		res.status(200).json(listeusers);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

updateFullname = async (req, res) => {
	try {
		console.log("req.body.fullnameValue ", req.body.fullnameValue);
		const auth_user = req.user;
		//console.log("auth_user ", auth_user);
		const user = await User.findOne({ _id: auth_user._id });
		user.fullname = req.body.fullnameValue;
		await user.save();
		res.status(200).json({
			status: 200,
			message: "Fullname changed successufuly.",
		});
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

updateUser = async (req, res) => {
	try {
		await User.updateOne(
			{
				_id: req.params.id,
			},
			req.body
		);
		res.status(200).json({
			message: "User updated",
		});
	} catch (error) {
		res.status(406).json({ message: error.message });
	}
};

enableDisable = async (req, res) => {
	try {
		const user = await User.findById({ _id: req.params.id });
		if (user.active === true) {
			user.active = false;
		} else {
			user.active = true;
		}
		await user.save();
		//console.log("user after save ", user);
		res.status(200).json({
			message: "changed state of user",
		});
	} catch (error) {
		res.status(406).json({ message: error.message });
	}
};

module.exports = {
	getCoachs,
	getAllUsers,
	getAdherentsCoach,
	updateFullname,
	updateUser,
	enableDisable,
};
