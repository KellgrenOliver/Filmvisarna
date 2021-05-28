const express = require("express");
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/whoami", usersController.whoami); // TODO: can we add the auth middleware here please?
router.get("/logout", usersController.logout);

router.get("/bookings", auth, usersController.getBookings);

router.post("/login", usersController.login);
router.post("", usersController.createUser);

module.exports = router;
