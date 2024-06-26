const express = require("express");

//controller functions
const {
  signupUser,
  loginUser,
  generateKeyForUser,
  getUser,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/login", loginUser);

router.get("/me", requireAuth, getUser);
router.get("/generatekey", requireAuth, generateKeyForUser);
router.post("/signup", signupUser);

module.exports = router;
