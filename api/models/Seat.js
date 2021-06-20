const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
	row: { type: String, required: true },
	id: { type: Number, required: true },
	type: { type: String, default: "adult", required: true },
	price: Number,
	auditorium: {
		type: Schema.Types.ObjectId,
		ref: "Auditorium",
		required: true,
	},
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
