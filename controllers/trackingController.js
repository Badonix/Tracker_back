const User = require("../models/userModel");
const Tracking = require("../models/trackingModel");
const recordVisit = async (req, res) => {
  const { token, ip, time } = req.body;
  if (!token || !ip || !time) {
    return res.status(403).json({ error: "Fill in all fields" });
  }
  try {
    const user = await User.findOne({ apiKey: token });
    if (!user) {
      return res.status(401).json({ error: "Not valid api key" });
    }
    const newTracking = new Tracking({
      user: user._id,
      ip_address: ip,
      timestamp: time,
    });
    let savedTracking = await newTracking.save();
    return res.json({ savedTracking });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { recordVisit };
