const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
	{
		auditorium: {
			type: Schema.Types.ObjectId,
			ref: "Auditorium",
			required: true,
		},
		seats: [{ type: Array, required: true }],
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		screening: {
			type: Schema.Types.ObjectId,
			ref: "Screening",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
