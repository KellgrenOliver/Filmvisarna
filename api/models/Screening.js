const mongoose = require("mongoose");
const { Schema } = mongoose;

const screeningSchema = new Schema(
	{
		movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
		bookings: [{ type: Schema.Types.ObjectId, ref: "Booking", required: true }],
		auditorium: {
			type: Schema.Types.ObjectId,
			ref: "Auditorium",
			required: true,
		},
		time: { type: Date, required: true, default: new Date() },
		price: { type: Number, required: true, default: 100 },
	},
	{ timestamps: true }
);

const Screening = mongoose.model("Screening", screeningSchema);

module.exports = Screening;
