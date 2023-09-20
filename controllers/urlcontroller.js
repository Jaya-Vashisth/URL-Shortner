const shortid = require("shortid");
const URL = require("./../models/url");

//generater url
exports.generateNewShortURL = async (req, res) => {
  const body = req.body;
  const shortID = shortid();

  if (!body.url)
    return res.status(400).json({
      error: "url is required",
    });

  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  res.status(200).json({
    id: shortID,
  });
};

//give number of times url clicked
exports.getAnalytics = async (req, res) => {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });

  return res.json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
