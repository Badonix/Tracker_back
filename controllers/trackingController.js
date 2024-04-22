const Page = require("../models/pageModel");
const Tracking = require("../models/trackingModel");

const recordVisit = async (req, res) => {
  let domain = req.get("origin");
  try {
    domain = domain.replace(/^https?:\/\//, "");
  } catch (e) {
    console.log(e);
    return res.status(381).json({ error: "AIRONOU" });
  }
  const { apiKey } = req.body;
  if (!apiKey) {
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
    const newTracking = new Tracking({
      ip_address: req.clientIp,
      page: page._id,
    });
    let savedTracking = await newTracking.save();
    return res.json({ savedTracking });
  } catch (e) {
    console.log(e);
  }
  res.json({ domain: req.get("host") });
};

module.exports = { recordVisit };
