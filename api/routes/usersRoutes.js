const express = require("express");
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/whoami", auth, usersController.whoami);
router.get("/logout", usersController.logout);

router.post("/login", usersController.login);
router.post("", usersController.register);
router.put("/:id", auth, usersController.update);

module.exports = router;
