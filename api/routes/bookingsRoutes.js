const express = require("express");
const bookingsController = require("../controllers/bookingsController");
const router = express.Router();

router.post("", bookingsController.placeBooking);
router.delete("/:id", bookingsController.removeBooking);

module.exports = router;
