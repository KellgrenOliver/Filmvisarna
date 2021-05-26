const Seat = require("../models/Seat");
const Auditorium = require("../models/Auditorium");

const getAllSeats = async (req, res) => {
	try {
		let seats = await Seat.find().exec();
		res.json(seats);
		console.log(seats);
	} catch (error) {
		console.log(error);
	}
};

const addSeatsToAuditorium = async (req, res) => {
	let seat;
	let auditorium;

	try {
		auditorium = await Auditorium.findById(req.body.auditoriumId);
		seat = await Seat.findById(req.body.seatId);
	} catch (err) {
		res.send("Something went wrong.");
		return;
	}
	seat._owner.push(auditorium._id);
	auditorium.seats.push(seat._id);
	await seat.save();
	await auditorium.save();

	res.json({ auditorium, seat });
};
module.exports = {
	addSeatsToAuditorium,
	getAllSeats,
};
