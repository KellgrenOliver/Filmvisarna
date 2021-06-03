const Screening = require("../models/Screening");
const errorLog = require("../utils/errorLog");
const { getBookedSeats } = require("../utils/seats");

async function getScreenings(req, res) {
	try {
		const screenings = await Screening.find();

		if (!screenings.length) {
			return res.status(404).end();
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
		let screening = await Screening.findById(id).populate([
			"movie",
			"auditorium",
		]);

		if (!screening) return res.status(404).end();

		screening.bookedSeats = await getBookedSeats(screening);

		res.status(200).json(screening);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function getScreeningsFromMovie(req, res) {
	try {
		const { movie } = req.params;

		if (Object.keys(req.query).length === 0) {
			let screening = await Screening.find({ movie }).populate([
				"movie",
				"auditorium",
			]);

			if (screening.length === 0) {
				return res.status(404).json({ error: "No results were found." });
			}

			return res.status(200).json(screening);
		}

		let queryPriceMin = req.query.priceMin ?? 0;
		let queryPriceMax = req.query.priceMax ?? Infinity;
		let startDate = req.query.startDate ?? new Date("0000-01-01");
		let endDate = req.query.endDate ?? new Date("9999-12-31");
		let screening = await Screening.find({
			movie,
			price: {
				$gte: queryPriceMin,
				$lte: queryPriceMax,
			},
			time: {
				$gte: new Date(startDate),
				$lte: new Date(endDate),
			},
		}).populate(["movie", "auditorium"]);

		if (!screening || screening.length === 0) {
			return res.status(404).json({ error: "No results were found." });
		}

		res.status(200).json(screening);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

module.exports = {
	getScreenings,
	getScreeningById,
	getScreeningsFromMovie,
};
