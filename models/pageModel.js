const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  domain: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  apiKey: {
    type: String,
  },
});

module.exports = mongoose.model("Page", pageSchema);
