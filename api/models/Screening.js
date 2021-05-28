const mongoose = require("mongoose");
const { Schema } = mongoose;

const screeningSchema = new Schema(
	{
		movie: { type: Schema.Types.ObjectId, ref: "Movie" },
		bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
		auditorium: { type: Schema.Types.ObjectId, ref: "Auditorium" },
		time: { type: Date, required: true, default: new Date() },
		price: { type: Number, required: true, default: 100 },
		bookedSeats: Array,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Screening", screeningSchema);
