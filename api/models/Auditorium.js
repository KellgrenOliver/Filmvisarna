
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auditoriumSchema = new Schema({
    name: {type: String},
    screenings: [{type: Schema.Types.ObjectId, ref: "Screening", required: true}],
    seats: [{type: Schema.Types.ObjectId, ref: "Seat", required: true}],
    bookings: [{type: Schema.Types.ObjectId, ref: "Booking", required: true}]
});

const Auditorium = mongoose.model("Auditorium", auditoriumSchema );

module.exports = Auditorium;