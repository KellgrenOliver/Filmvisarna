const Auditorium = require("../models/Auditorium");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const User = require("../models/User");
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
			auditorium: auditorium._id,
			screening: screening._id,
			movie: movie._id,
			user: user._id,
			seats,
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
		const booking = await Booking.findOne({ _id: id });

		if (!booking) {
			return res.status(404).end();
		} else if (String(booking.user) !== String(user._id)) {
			return res.status(403).end();
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
