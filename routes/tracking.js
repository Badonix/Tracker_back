const express = require("express");
const { recordVisit } = require("../controllers/trackingController");
const router = express.Router();

router.post("/record", recordVisit);

module.exports = router;
