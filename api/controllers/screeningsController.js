const Screening = require("../models/Screening");
const errorLog = require("../utils/errorLog");

async function getBookedSeats(screening) {}

async function getScreenings(req, res) {
	try {
		res
			.status(200)
			.json(await Screening.find().populate(["movie", "auditorium"]));
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function getScreeningById(req, res) {
	const { id } = req.params;
	try {
		res
			.status(200)
			.json(
				await Screening.findOne({ _id: id }).populate(["movie", "auditorium"])
			);
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

async function getScreeningsFromMovie(req, res) {
	const { movie } = req.params;
	try {
		res
			.status(200)
			.json(await Screening.find({ movie }).populate(["movie", "auditorium"]));
	} catch (e) {
		errorLog(e);
		res.status(500).end();
	}
}

module.exports = {
	getScreenings,
	getScreeningById,
	getScreeningsFromMovie,
	getBookedSeats,
};
