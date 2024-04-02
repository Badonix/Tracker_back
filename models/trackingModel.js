const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackingSchema = new Schema({
  ip_address: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: String },
});

module.exports = mongoose.model("Tracking", trackingSchema);
