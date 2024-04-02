const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    apiKey: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

userSchema.statics.signup = async function (email, username, password) {
  if (!email || !password || !username) {
    throw Error("Fill in all fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Not valid email");
  }
  if (username.length <= 3) {
    throw Error("Username is too short");
  }
  if (username.length >= 20) {
    throw Error("Username is too big");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
  ) {
    throw Error("Weak password");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });
  if (emailExists) {
    throw Error("Email already in use");
  } else if (usernameExists) {
    throw Error("Username exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });
  return user;
};

userSchema.statics.login = async function (login, password) {
  if (!login || !password) {
    throw Error("Fill in all fields");
  }
  let user;
  if (validator.isEmail(login)) {
    user = await this.findOne({ email: login });
  } else {
    user = await this.findOne({ username: login });
  }
  console.log(user);
  if (!user) {
    throw Error("Wrong Credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Wrong credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
