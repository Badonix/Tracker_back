const { generateKey } = require("../helpers/cryptography");
const Tracking = require("../models/trackingModel");
const Page = require("../models/pageModel");

const createPage = async (req, res) => {
  const { domain } = req.body;
  const { user } = req;
  if (!domain || !user) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    let key = generateKey();
    console.log(key);
    let page = await Page.create({ user, apiKey: key, domain });
    return res.status(201).json({ page });
  } catch (e) {
    console.log(e);
  }
};

const getPages = async (req, res) => {
  const { user } = req;
  try {
    let pages = await Page.find({ user });
    if (!pages) {
      return res.json({ message: "No pages found" });
    }
    return res.json({ pages });
  } catch (e) {
    console.log(e);
    return res.json({ e });
  }
};

const getSinglePage = async (req, res) => {
  const { pageId } = req.body;
  let { user } = req;
  try {
    if (!pageId) {
      return res.status(400).json({ message: "Missing fields" });
    }
    let page = await Page.findOne({ user, _id: pageId });
    if (!page) {
      return res.status(404).json({ message: "No page found" });
    }
    return res.json({ page });
  } catch (e) {
    return res.json({ e });
  }
};

const getPageTrackings = async (req, res) => {
  const { pageId } = req.params;
  let { user } = req;

  try {
    if (!pageId) {
      return res.status(400).json({ message: "Missing fields" });
    }
    var page;
    try {
      page = await Page.findById(pageId);
    } catch (e) {
      console.log("No page found");
    }
    if (!page) {
      return res.json({ message: "No page found" });
    }

    if (!page.user.equals(user._id)) {
      return res.status(401).json({ message: "Not authorized" });
    }
    let pageTrackings = await Tracking.find({ page: pageId }).sort({
      createdAt: -1,
    });
    return res.json({ pageTrackings });
  } catch (e) {
    console.log(e);
  }
};
const deletePage = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    let page = await Page.findOneAndDelete({ _id: id, user });
    if (!page) {
      return res.status(404).json({ message: "No page was found" });
    }
    return res.json({ message: "Deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Unknown error" });
  }
};

module.exports = {
  createPage,
  getPageTrackings,
  getSinglePage,
  getPages,
  deletePage,
};
