const Movie = require("../models/Movie");
const Screening = require("../models/Screening");

const getAllMovies = async (req, res) => {
  try {
    let movies = await Movie.find().exec();
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
};

const getMoviesByFilter = async (req, res) => {
  try {
    let querySearch = new RegExp(`${req.query.search ?? ""}\\w*`, "gi");
    let queryLengthMin = req.query.lengthMin ?? 0;
    let queryLengthMax = req.query.lengthMax ?? Infinity;
    let queryLanguage = new RegExp(`^${req.query.language ?? ""}`, 'gi');
    let queryGenre = new RegExp(`^${req.query.genres ?? ""}`, 'gi');
    let queryDirector = new RegExp(`^${req.query.directors ?? ""}`, 'gi');
    let queryStar = new RegExp(`^${req.query.stars ?? ""}`, 'gi');
    let queryRating = new RegExp(`${req.query.rating ?? ""}$`, 'gi');

    let movies = await Movie.find({
        language: queryLanguage,
        genres: queryGenre,
        directors: queryDirector,
        stars: queryStar,
        rating: queryRating,
        length: {
          $gte: queryLengthMin,
          $lte: queryLengthMax
        },       
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

    }).exec()

    if (movies.length === 0) {
      res.status(404).json({
        error: "No movies matched"
      })
      return
    }
    res.json(movies)
  } catch (err) {
    res.status(400).send(err)
  }
}


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
  getMoviesByFilter
};