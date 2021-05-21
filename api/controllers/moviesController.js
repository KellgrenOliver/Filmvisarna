const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
	try {
		let movies = await Movie.find().exec();
		res.json(movies);
	} catch (error) {
		console.log(error);
	}
};

const getMovieById = (req, res) => {
	Movie.findById(req.params.movieId).exec((err, movie) => {
		if (err) {
			res.json(err);
			return;
		}
		if (!movie) {
			res.json({
				err: `movie with id ${req.params.movieId} does not exist`,
			});
			return;
		}
		res.json(movie);
	});
};

module.exports = {
	getAllMovies,
	getMovieById,
};
