const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
	try {
		let movies = await Movie.find().exec();
		res.json(movies);
	} catch (error) {
		console.log(error);
	}
};

const getSearchedMovies = async (req, res) => {
  try {
    let querySearch = new RegExp(`${req.query.search ? req.query.search: ""}\\w*`, "gi");

  }

}

module.exports = {
	getAllMovies,
  getSearchedMovies
};
