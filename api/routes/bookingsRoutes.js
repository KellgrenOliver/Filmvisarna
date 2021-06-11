const express = require("express");
const bookingsController = require("../controllers/bookingsController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("", auth, bookingsController.placeBooking);
router.delete("/:id", bookingsController.removeBooking);

module.exports = router;
