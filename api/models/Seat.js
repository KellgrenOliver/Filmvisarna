const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema ({
  row:String,
  number:Number
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat