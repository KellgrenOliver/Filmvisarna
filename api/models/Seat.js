const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema ({
  row: { type: String, default:null },
  type: { type:String, default:"adult", required: true },
  reserved:{ type:Boolean, required: true, default: false },
  booked:{ type:Boolean, required: true, default: false },
  _owners:[ { type:Schema.Types.ObjectId, ref:"Auditorium"} ]
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat