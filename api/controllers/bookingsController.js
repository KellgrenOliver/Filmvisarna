const Auditorium = require("../models/Auditorium");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const errorLog = require("../utils/errorLog");

async function placeBooking(req, res) {
	const { user } = req.session;
	if (!user) return res.status(401).end();

	const { seats, screening } = req.body;

	try {
		if (await Booking.exists({ user, screening })) {
			return res
				.status(405)
				.json({ error: "You have already booked this screening." });
		}

		const { _id: auditorium } = await Auditorium.findOne({
			_id: screening.auditorium,
		});
		if (!auditorium) {
			return res.status(404).json({ error: "Auditorium not found." });
		}

		const { _id: movie } = await Movie.findOne({ _id: screening.movie });
		if (!movie) {
			return res.status(404).json({ error: "Movie not found." });
		}

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

module.exports = {
	placeBooking,
};
