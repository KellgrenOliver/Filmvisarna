const express = require("express");
const router = express.Router();

const screeningsController = require("../controllers/screeningsController");

router.get("", screeningsController.getScreenings);
router.get("/:id", screeningsController.getScreeningById);
router.get("/movie/:movie", screeningsController.getScreeningsFromMovie);

module.exports = router;
