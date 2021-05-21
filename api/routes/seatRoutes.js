const express = require("express");
const seatController = require("../controllers/seatController");
const router = express.Router();

router.post("/addSeatsToAuditorium", seatController.addSeatsToAuditorium);

module.exports = router;