const express = require("express");
const auditoriumController = require("../controllers/auditoriumController");
const router = express.Router();

router.get("", auditoriumController.getAuditoria);
router.get("/:id", auditoriumController.getAuditoriumById);

module.exports = router;
