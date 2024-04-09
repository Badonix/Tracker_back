const express = require("express");
const {
  createPage,
  getPages,
  getSinglePage,
  deletePage,
} = require("../controllers/pageController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/", requireAuth, createPage);
router.get("/", requireAuth, getPages);
router.post("/single", requireAuth, getSinglePage);
router.delete("/:id", requireAuth, deletePage);
module.exports = router;
