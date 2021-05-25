const Auditorium = require("../models/Auditorium");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const errorLog = require("../utils/errorLog");

async function placeBooking(req, res) {
	const { user } = req.session;
	const { seats, screening } = req.body;

	try {
		const { _id: auditorium } = await Auditorium.findOne({
			_id: screening.auditorium,
		});
		const { _id: movie } = await Movie.findOne({ _id: screening.movie });

		await Booking.create({
			auditorium,
			movie,
			user,
			seats,
			screening,
		});
		res.status(200).end();
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function removeBooking(req, res) {
	const { user } = req.session;
	const { id } = req.params;

	try {
		const booking = await Booking.findOne({ _id: id, user });
		if (!booking) {
			return res.status(404).end();
		}
		await Booking.deleteOne(booking);
		res.status(200).end();
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

module.exports = {
	placeBooking,
	removeBooking,
};
