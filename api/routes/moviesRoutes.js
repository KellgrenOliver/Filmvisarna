const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController");

router.get("/filter", moviesController.getMovieByFilter);
router.get("/:movieId", moviesController.getMovieById);
router.get("", moviesController.getAllMovies);

module.exports = router;
