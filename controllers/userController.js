const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { generateKey } = require("../helpers/cryptography");
dotenv.config();
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { login, password: userPassword } = req.body;
  try {
    const user = await User.login(login, userPassword);

    const token = createToken(user._id);
    let { username, email } = user;
    res.status(200).json({ token, username, email });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generateKeyForUser = async (req, res) => {
  try {
    let token = generateKey();
    await User.findByIdAndUpdate(req.user, { apiKey: token });
    res.json({ token });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { generateKeyForUser, signupUser, loginUser };
