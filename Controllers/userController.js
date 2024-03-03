const User = require("../Models/User");

getCoachs = async (req, res) => {
	try {
		const listecoachs = await User.find({role: "coach"});
		res.status(200).json(listecoachs);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

getAllUsers = async (req, res) => {
	try {
		const listeusers = await User.find({});
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

getUserById = async (req, res) => {
	try {
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};
getUserByName = async (req, res) => {
	try {
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};
deleteUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};
module.exports = {
	getCoachs,
	getAllUsers,
	getAdherentsCoach,
};
