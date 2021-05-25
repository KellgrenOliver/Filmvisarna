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

const getMoviesBySearch = async (req, res) => {
  try {
    let querySearch = new RegExp(`${req.query.search ? req.query.search: ""}\\w*`, "gi");
    let query = Movie.find({
      $or: [{
        title: querySearch
      }, {
        language: querySearch
      }, {
        genres: querySearch
      }, {
        directors: querySearch
      }, {
        stars: querySearch
      }]
    });
    let movies;
    movies = await query.exec();
    if (movies.length === 0) {
      res.send("No movies matched the search ");
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
  getMoviesBySearch
};