const mongoose = require("mongoose");
const { Schema } = mongoose;
const Seat = require("./Seat");
const bookingSchema = new Schema(
	{
		auditorium: {
			type: Schema.Types.ObjectId,
			ref: "Auditorium",
			required: true,
		},
		seats: [{ type: Schema.Types.ObjectId, ref: Seat }],
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		screening: {
			type: Schema.Types.ObjectId,
			ref: "Screening",
			required: true,
		},
		movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
