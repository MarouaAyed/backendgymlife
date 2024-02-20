const mongoose = require("mongoose");

const schemaPlan = new mongoose.Schema(
	{
		// ["gold", "platinuim", "silver"], // gold  = 6 mois , platinuim = 3 mois, silver = 1 mois
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		price: {
			type: String,
			required: true,
		},
		validity_days: {
			type: Number,
			required: true,
			trim: true,
		},
		details: {
			type: String,
			required: true,
		},
		picture: {
			type: String,
			required: false,
		},
		state: {
			type: Boolean,
			default: true, // true enable , false disable
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Plan", schemaPlan);
