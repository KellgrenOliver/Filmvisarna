const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.get("/whoami", usersController.whoami);
router.get("/logout", usersController.logout);

router.post("/login", usersController.login);
router.post("", usersController.createUser);

module.exports = router;
