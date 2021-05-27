const Movie = require("../models/Movie");
const Screening = require("../models/Screening");

const getAllMovies = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      let movies = await Movie.find().exec();
      res.json(movies);
      return;
    }
    let querySearch = new RegExp(`${req.query.search ?? ""}\\w*`, "gi");
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
      res.status(404).json({
        error: "The movies doesn't match"
      })
      return
    }
    res.json(movies)
  } catch (err) {
    res.status(400).send(err)
  }
};

// pris, datum, längd på filmen, åldersgräns, genre, skådespelare, regissör och språk.

const getMoviesByFilter = async (req, res) => {
  try {
    let queryPriceMin = req.query.priceMin ?? 0;
    let queryPriceMax = req.query.priceMax ?? Infinity;
    let startDate = req.query.startDate ?? new Date("0000-01-01");
    let endDate = req.query.endDate ?? new Date("9999-12-31");
    let queryLengthMin = req.query.lengthMin ?? 0;
    let queryLengthMax = req.query.lengthMax ?? Infinity;
    let queryLanguage = new RegExp(`^${req.query.language ?? ""}\\w*`, 'gi');
    let queryGenre = new RegExp(`^${req.query.genre ?? ""}\\w*`, 'gi');
    let queryDirector = new RegExp(`^${req.query.director ?? ""}\\w*`, 'gi');
    let queryStar = new RegExp(`^${req.query.star ?? ""}\\w*`, 'gi');
    let queryRating = new RegExp(`^${req.query.rating ?? ""}\\w*`, 'gi');

    let movies = await Screening.find({
      price: {
        $gte: queryPriceMin,
        $lte: queryPriceMax
      },
      time: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).select("movie").populate({
      path: "movie",
      match: {
        language: queryLanguage,
        genres: queryGenre,
        directors: queryDirector,
        stars: queryStar,
        rating: queryRating,
        length: {
          $gte: queryLengthMin,
          $lte: queryLengthMax
        }
      }
    }).exec()

    if (movies.length === 0) {
      res.status(404).json({
        error: "The movies doesn't match"
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