const Auditorium = require("../models/Auditorium");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");

const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
const DAY_IN_MILLISECONDS = HOUR_IN_MILLISECONDS * 24;

function getRandomMovieId(movies = []) {
	return movies[Math.floor(Math.random() * movies.length)];
}

async function screeningSeeder() {
	await Screening.createCollection();
	await Screening.collection.drop();

	const movies = await Movie.find();
	const auditoria = await Auditorium.find();

	for (let i = 0; i < auditoria.length; i++) {
		let start = new Date().setHours(15, 0, 0, 0);

		for (let j = 0; j < 31; j++) {
			// Per day
			const screenings = [
				new Screening({
					time: start + DAY_IN_MILLISECONDS * j,
					auditorium: auditoria[i]._id,
					movie: getRandomMovieId(movies),
				}),
				new Screening({
					time: start + DAY_IN_MILLISECONDS * j + HOUR_IN_MILLISECONDS * 3,
					auditorium: auditoria[i]._id,
					movie: getRandomMovieId(movies),
				}),
				new Screening({
					time: start + DAY_IN_MILLISECONDS * j + HOUR_IN_MILLISECONDS * 6,
					auditorium: auditoria[i]._id,
					movie: getRandomMovieId(movies),
				}),
			];
			await Screening.insertMany(screenings);
		}
	}
}

module.exports = {
	screeningSeeder,
};
