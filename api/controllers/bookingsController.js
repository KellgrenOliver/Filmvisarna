const Auditorium = require("../models/Auditorium");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const errorLog = require("../utils/errorLog");

async function placeBooking(req, res) {
	const { user } = req.session;
	const { screeningId, seats } = req.body;

	if (!screeningId || !seats) {
		return res
			.status(400)
			.json({ error: "Please provide a screening id and seats array" });
	}

	try {
		if (await Booking.exists({ user, screening: screeningId })) {
			return res
				.status(405)
				.json({ error: "You have already booked this screening." });
		}

		const screening = await Screening.findById(screeningId);
		if (!screening) {
			return res.status(404).json({ error: "Screening not found." });
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
			auditorium: screening.auditorium,
			movie: screening.movie,
			screening: screening.id,
			user,
			seats,
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
