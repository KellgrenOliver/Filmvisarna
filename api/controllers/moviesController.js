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
	console.log("hej");
	Movie.findById(req.params.movieId).exec((err, movie) => {
		console.log(movie);
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
		console.log(req.params.movieId);
	});
};

module.exports = {
	getAllMovies,
	getMovieById,
};
