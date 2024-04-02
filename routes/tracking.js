const express = require("express");
const { recordVisit } = require("../controllers/trackingController");

//controller functions
const router = express.Router();

router.post("/record", recordVisit);

module.exports = router;
