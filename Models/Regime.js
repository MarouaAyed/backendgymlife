const mongoose = require("mongoose");

const schemaTime = new mongoose.Schema({
	name: { // break 
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const schemaDay = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	time: [schemaTime],
	date: {
		type: String,
		required: true,
	},
});

const schemaRegime = new mongoose.Schema(
	{
		start_date: {
			type: String,
			required: true,
			unique: true,
		},
		end_date: {
			type: String,
			required: true,
		},
		days: [schemaDay], // 7 day
		adherent: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		state: {
			type: Boolean,
			default: true, // true enable , false disable
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Regime", schemaRegime);
