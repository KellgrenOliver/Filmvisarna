const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
	try {
		let movies = await Movie.find().exec();
		res.json(movies);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllMovies,
};
