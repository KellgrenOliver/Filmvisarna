const express = require("express");
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/whoami", auth, usersController.whoami);
router.get("/logout", usersController.logout);

router.post("/login", usersController.login);
router.post("", usersController.createUser);
router.put("/:id", auth, usersController.editUser);

module.exports = router;
