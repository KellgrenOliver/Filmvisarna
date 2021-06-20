const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auditoriumSchema = new Schema({
	id: { type: Number, required: true },
	screenings: [
		{ type: Schema.Types.ObjectId, ref: "Screening", required: true },
	],
	seats: [{ type: Schema.Types.ObjectId, ref: "Seat", required: true }],
});

const Auditorium = mongoose.model("Auditorium", auditoriumSchema);

module.exports = Auditorium;
