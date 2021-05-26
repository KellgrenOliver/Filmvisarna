const Booking = require("../models/Booking");
const Screening = require("../models/Screening");
const errorLog = require("../utils/errorLog");

async function appendBookedSeats(screening) {
	const bookings = await Booking.where({ screening: screening._id });

	const bookedSeats = [];

	bookings.forEach((booking) => {
		bookedSeats.push(...booking.seats.map((seat) => seat[0]));
	});

	screening.bookedSeats = bookedSeats;
	return screening;
}

async function getScreenings(req, res) {
	try {
		const screenings = await Screening.find().populate(["movie", "auditorium"]);

		if (!screenings) {
			return res.status(404).end();
		}

		for (let i = 0; i < screenings.length; i++) {
			await appendBookedSeats(screenings[i]);
		}

		res.status(200).json(screenings);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function getScreeningById(req, res) {
	const { id } = req.params;
	try {
		const screening = await Screening.findById(id).populate([
			"movie",
			"auditorium",
		]);

		if (!screening) {
			return res.status(404).end();
		}

		res.status(200).json(await appendBookedSeats(screening));
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function getScreeningsFromMovie(req, res) {
	const { movie } = req.params;
	try {
		const screening = await Screening.find({ movie }).populate([
			"movie",
			"auditorium",
		]);

		if (!screening) {
			return res.status(404).end();
		}

		res.status(200).json(await appendBookedSeats(screening));
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

module.exports = {
	getScreenings,
	getScreeningById,
	getScreeningsFromMovie,
	appendBookedSeats,
};
