const Auditorium = require("../models/Auditorium");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");

async function screeningSeeder(perAuditorium = 5) {
	await Screening.createCollection();
	await Screening.collection.drop();

	const movieCount = await Movie.countDocuments();
	const auditoriumCount = await Auditorium.countDocuments();

	for (let i = 0; i < auditoriumCount; i++) {
		for (let j = 0; j < perAuditorium; j++) {
			const { _id: movie } = await Movie.findOne().skip(
				Math.floor(Math.random() * movieCount)
			);
			const { _id: auditorium } = await Auditorium.findOne().skip(i);

			await Screening.create(new Screening({ movie, auditorium }));
		}
	}
}

module.exports = {
	screeningSeeder,
};
