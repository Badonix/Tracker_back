const express = require("express");
const { recordVisit } = require("../controllers/trackingController");
const requireAuth = require("../middlewares/requireAuth");
//controller functions
const router = express.Router();

router.post("/record", requireAuth, recordVisit);

module.exports = router;
