const Regime = require("../Models/Regime");

createRegime = async (req, res) => {
	try {
		//	console.log("body ", req.body);
		const lastRegime = await Regime.findOne({
			adherent: req.body.adherent,
			state: true,
		}).select("state");

		/* 	lastRegime.map(async (r) => {
			r.state = false;
			await r.save();
		}); */
		if (lastRegime) {
			lastRegime.state = false;
			await lastRegime.save();
		}
		// Create a new Regime instance with the provided data
		const newRegime = new Regime({
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			days: req.body.days.map((day) => ({
				name: day.name,
				times: [], // Initialize with an empty array, as times will be pushed
				date: day.date,
			})),
			adherent: req.body.adherent,
		});

		// Iterate over each day and add times from the request body
		newRegime.days.forEach((day) => {
			day.times.push(...req.body.times);
		});

		// Save the new regime to the database
		await newRegime.save();
		res.status(201).json({ status: 201, message: "create regime" });
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

getRegimeAdherent = async (req, res) => {
	try {
		const regimes = await Regime.find({ adherent: req.params.id }).sort({
			createdAt: -1,
		});
		res.status(200).json(regimes);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

getRegime = async (req, res) => {
	try {
		const user = req.user;
		//	console.log("user ", user);
		const regime = await Regime.findOne({ adherent: user._id, state: true });
		res.status(200).json(regime);
	} catch (error) {
		res.status(406).json({ status: 406, message: error.message });
	}
};

disableRegime = async (req, res) => {
	try {
		const regime = await Regime.findById({ _id: req.params.id });
		regime.state = false;

		await regime.save();
		console.log("regime after save ", regime);

		res.status(200).json({
			message: "disable regime",
		});
	} catch (error) {
		res.status(406).json({ message: error.message });
	}
};

module.exports = {
	createRegime,
	getRegimeAdherent,
	getRegime,
	disableRegime,
};
