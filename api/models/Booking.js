const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	auditorium: { type: Schema.Types.ObjectId, ref: "Auditorium", required: true },
	seats: [{ type: Schema.Types.ObjectId, ref: "Seat", required: true }],
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	screening: { type: Schema.Types.ObjectId, ref: "Screening", required: true },
}, { timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
