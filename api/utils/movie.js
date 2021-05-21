const errorLog = require("./errorLog");
const movies = require("../../movies.json");
const Movie = require("../models/Movie");

async function movieSeeder() {
	try {
		if (!movies?.length) {
			throw new Error(`Expected movies, got ${JSON.stringify(movies)}`);
		}
		await Movie.collection.drop();
		await Movie.insertMany(movies);
	} catch (e) {
		errorLog(e);
	}
}

module.exports = {
	movieSeeder,
};
