const express = require("express");
const auditoriumController = require("../controllers/auditoriumController");
const router = express.Router();

router.post("", auditoriumController.createAuditorium);

module.exports = router;
