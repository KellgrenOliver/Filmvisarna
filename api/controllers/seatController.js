const Seat = require("../models/Seat");
const Auditorium = require("../models/Auditorium");

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

const getSeatsByAuditorium = async (req, res) => {};

module.exports = {
	addSeatsToAuditorium,
	getSeatsByAuditorium,
};
