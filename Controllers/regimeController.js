const Regime = require("../Models/Regime");
const User = require("../Models/User");

createRegime = async (req, res) => {
	try {
		const regime = await Regime.create(...req.body);
		res.status(201).json({ message: "create regime", data: regime });
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

getRegimeAdherent = async (req, res) => {
	try {
		const regime = await Regime.find({});
		res.status(200).json(regime);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

module.exports = {
	createRegime,
	getRegimeAdherent,
};
