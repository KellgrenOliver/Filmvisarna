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
    res.status(404).send(err)
  }
};

// pris, datum, längd på filmen, åldersgräns, genre, skådespelare, regissör och språk.

// const getMoviesByFilter = async (req, res) => {
//   try {
//     // let queryPrice = req.query.price ? Number(req.query.price) : ""
//     let queryLengthMin = req.query.lengthMin ?? 0;
//     let queryLengthMax = req.query.lengthMax ?? Infinity;
//     let queryLanuage = req.query.langiage ?? "";
//     let queryGenre = req.query.genre ?? "";
//     let queryDirector = req.query.director ?? "";
//     let queryStar = req.query.star ?? "";
//     // let queryDate = req.query.filterDate ? req.query.filterDate : new Date()

//     let movies = await Screening.find().select("movie").populate({
//       path: "movie",
//       match: {
//         $and: [{
//           language: queryLanguage
//         }, {
//           genres: queryGenre
//         }, {
//           directors: queryDirector
//         }, {
//           stars: queryStar
//         }, {
//           rating : queryReating
//         }]
//       }
//     }).exec()


//     if (movies.length === 0) {
//       res.send("No movied matched the filter ");
//       return
//     }
//     res.json(movies)
//   } catch (error) {
//     console.log(error);
//   }
// }

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