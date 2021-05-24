const Auditorium = require("../models/Auditorium");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const errorLog = require("../utils/errorLog");

async function placeBooking(req, res) {
	if (!req.session.user) {
		return res.status(401).end();
	}
	const { seats, screening } = req.body;
	const { user } = req.session;
	try {
		const { _id: auditorium } = await Auditorium.findOne({
			_id: screening.auditorium,
		});
		const { _id: movie } = await Movie.findOne({ _id: screening.movie });

		const booking = await Booking.create({
			auditorium,
			movie,
			user,
			seats,
			screening,
		});
		res.status(200).end();
	} catch (e) {
		res.status(500).end();
		errorLog(e);
	}
}

module.exports = {
	placeBooking,
};
