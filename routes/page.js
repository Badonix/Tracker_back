const express = require("express");
const {
  createPage,
  getPages,
  getSinglePage,
} = require("../controllers/pageController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/", requireAuth, createPage);
router.get("/", requireAuth, getPages);
router.post("/single", requireAuth, getSinglePage);
module.exports = router;
