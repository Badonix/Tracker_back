const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackingSchema = new Schema(
  {
    ip_address: {
      type: String,
    },
    page: { type: Schema.Types.ObjectId, ref: "Page" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tracking", trackingSchema);
