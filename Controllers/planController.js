const Plan = require("../Models/Plan");

module.exports = {
	createPlan: async (req, res) => {
		try {
			req.body["picture"] = !req.file ? null : req.file.filename;

			const plan = await Plan.create({ ...req.body });
			res.status(201).json({ message: "create plan", data: plan });
		} catch (error) {
			res.status(406).json({ message: error.message });
		}
	},
	getAllPlans: async (req, res) => {
		try {
			const listePlans = await Plan.find({});
			res.status(200).json(listePlans);
		} catch (error) {
			res.status(406).json({ message: error.message });
		}
	},

	getActive: async (req, res) => {
		try {
			const listePlans = await Plan.find({ state: true });
			res.status(200).json({
				message: "read active Plan",
				data: listePlans,
			});
		} catch (error) {
			res.status(406).json({ message: error.message });
		}
	},
	getPlanById: async (req, res) => {
		try {
			const plan = await Plan.findById({
				_id: req.params.id,
			});
			res.status(200).json({
				message: "Plan found by id",
				data: plan,
			});
		} catch (error) {
			res.status(406).json({ message: error.message });
		}
	},
	searchPlan: async (req, res) => {
		try {
			const plan = await Plan.find({ name: req.query.name });
			res.status(200).json({
				message: "Plan founded",
				status: 200,
				data: plan,
			});
		} catch (error) {
			res.status(406).json({ status: 406, message: error.message });
		}
	},
	updatePlan: async (req, res) => {
		try {
			await Plan.updateOne(
				{
					_id: req.params.id,
				},
				req.body
			);
			res.status(200).json({
				message: "Plan updated",
			});
		} catch (error) {
			res.status(406).json({ message: error.message });
		}
	},

	changeStatePlan: async (req, res) => {
		try {
			const plan = await Plan.findById({ _id: req.params.id });
			if (plan.state === true) {
				plan.state = false;
			} else {
				plan.state = true;
			}

			await plan.save();
			console.log("plan after save ", plan);

			res.status(200).json({
				message: "changed state of plan",
			});
		} catch (error) {
			res.status(406).json({ message: error.message });
		}
	},
};
