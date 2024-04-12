const Page = require("../models/pageModel");
const User = require("../models/userModel");
const Tracking = require("../models/trackingModel");
const recordVisit = async (req, res) => {
  let domain = req.get("host");
  //temp
  //temp
  console.log(domain);
  const { apiKey, ip } = req.body;
  const { user } = req;
  if (!apiKey || !ip) {
    return res.status(403).json({ error: "Fill in all fields" });
  }
  try {
    const page = await Page.findOne({ apiKey });
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    if (domain != page.domain) {
      return res.status(404).json({ error: "Not valid domain" });
    }
    console.log(user._id, page.user);
    if (!page.user.equals(user._id)) {
      return res.status(401).json({ error: "Not authorized" });
    }
    // const newTracking = new Tracking({
    //   user: user._id,
    //   ip_address: ip,
    //   timestamp: time,
    // });
    // let savedTracking = await newTracking.save();
    return res.json({ page });
  } catch (e) {
    console.log(e);
  }
  res.json({ domain: req.get("host") });
};

module.exports = { recordVisit };
