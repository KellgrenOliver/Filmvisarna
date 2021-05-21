const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  row: { type: String, default: null },
  id: { type: Number, required: true },
  type: { type: String, default: "adult", required: true },
  auditorium: { type: Schema.Types.ObjectId, ref: "Auditorium" },
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat