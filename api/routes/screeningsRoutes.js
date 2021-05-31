const express = require("express");
const router = express.Router();

const screeningsController = require("../controllers/screeningsController");

router.get("/movie/:movie", screeningsController.getScreeningsFromMovie);
router.get("/:id", screeningsController.getScreeningById);
router.get("", screeningsController.getScreenings);

module.exports = router;
