const Booking = require("../models/Booking");
const Screening = require("../models/Screening");
const errorLog = require("../utils/errorLog");
const { getBookedSeats } = require("../utils/seats");
const { validateBody } = require("../utils/validation");

async function placeBooking(req, res) {
	if (!validateBody(req.body, ["screeningId", "seats"])) {
		return res.status(400).json({
			error: "Please provide a screening id and a seats array",
		});
	}

	const { user } = req.session;
	const { screeningId, seats } = req.body;

	try {
		if (await Booking.exists({ user, screening: screeningId })) {
			return res
				.status(405)
				.json({ error: "You have already booked this screening." });
		}

		const screening = await Screening.findById(screeningId).populate(
			"auditorium",
			"movie"
		);

		if (!screening) {
			return res.status(404).json({ error: "Screening not found." });
		}

		if (new Date() > screening.time) {
			return res
				.status(403)
				.json({ error: "This screening is no longer bookable." });
		}

		const bookedSeats = await getBookedSeats(screening);

		if (
			seats.some((seat) =>
				bookedSeats.find(
					(bookedSeat) => String(bookedSeat._id) === String(seat)
				)
			)
		) {
			return res
				.status(403)
				.json({ error: "One or more of these seats are already booked." });
		}

		if (seats.length >= 5) {
			return res.status(400).json({ error: "You can't book this many seats." });
		}

		const booking = await Booking.create({
			auditorium: screening.auditorium._id,
			screening: screening._id,
			movie: screening.movie._id,
			user: user._id,
			seats,
		});

		res
			.status(200)
			.json(
				await booking
					.populate(["movie", "auditorium", "screening"])
					.execPopulate()
			);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function removeBooking(req, res) {
	const { user } = req.session;
	const { id } = req.params;

	try {
		const booking = await Booking.findById(id).populate("screening");

		if (!booking) {
			return res.status(404).end();
		} else if (String(booking.user) !== String(user._id)) {
			return res.status(403).end();
		} else if (new Date() > booking.screening.time) {
			return res
				.status(403)
				.json({ error: "This screening is no longer unbookable." });
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
