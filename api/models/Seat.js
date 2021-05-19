const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema ({
  row:String,
  number:Number,
  type:{type:String, default:"adult"}
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat