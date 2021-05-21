const Auditorium = require("../models/Auditorium");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");

async function createRandomScreening(
	moviesCount = 20,
	auditoriumsCount = 3,
	iterations = 15
) {
	for (let i = 0; i < iterations; i++) {
		const movieIndex = Math.floor(Math.random() * moviesCount);
		const auditoriumIndex = Math.floor(Math.random() * auditoriumsCount);

		const randomMovie = await Movie.findOne().skip(movieIndex);
		const randomAuditorium = await Auditorium.findOne().skip(auditoriumIndex);

		const screening = new Screening({
			movie: randomMovie._id,
			auditorium: randomAuditorium._id,
		});

		Screening.create(screening);
	}
}

module.exports = {
	createRandomScreening,
};
