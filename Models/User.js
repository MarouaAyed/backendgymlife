const mongoose = require("mongoose");

const schemaSubscription = new mongoose.Schema(
	{
		plan: {
			type: mongoose.Types.ObjectId,
			ref: "Plan",
			required: true,
		},
		start_date: {
			type: String,
			required: false,
		},
		end_date: {
			type: String,
			required: false,
		},
		paied: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const schemaUser = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: false,
			minlength: 4,
			trim: true,
		},
		age: {
			type: String,
			required: false,
		},
		sex: {
			type: Number,
			enum: [0, 1], // 0 homme , 1 femme
		},
		contact: {
			type: Number,
			required: false,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: false,
			trim: true,
		},
		height: {
			type: String,
			required: false,
		},
		weight: {
			type: String,
			required: false,
		},
		subscription: [schemaSubscription],
		active: {
			type: Boolean,
			default: true,
		},
		resetPasswordToken: {
			type: String,
			required: false,
		},
		resetPasswordExpiresIn: {
			type: Date,
			required: false,
		},
		picture: {
			type: String,
			required: false,
		},
		role: {
			type: String,
			enum: ["admin", "adherent", "coach"], //énumération
		},
		coach: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: false,
		},
		adherents: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
				required: false,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", schemaUser);
