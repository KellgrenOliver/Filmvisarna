const express = require("express");
const bookingsController = require("../controllers/bookingsController");
const router = express.Router();

router.post("", bookingsController.placeBooking);

module.exports = router;
