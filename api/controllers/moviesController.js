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

const getSearchedMovies = async (req, res) => {
  try {
    let querySearch = new RegExp(`${req.query.search ? req.query.search: ""}\\w*`, "gi");
    let query = Post.find({
      $or: [{
        title: querySearch
      }, {
        genres: querySearch
      }, {
        description: querySearch
      }]
    });

    let movies;
    movies = await query.exec();
    if (movies.length === 0) {
      res.send("No movied matched the filter ");
      return
    }
    res.json(movies)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
	getAllMovies,
	getMovieById,
  getSearchedMovies
};