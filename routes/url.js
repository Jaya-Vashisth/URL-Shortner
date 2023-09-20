const express = require("express");
const urlcontroller = require("./../controllers/urlcontroller");
const router = express.Router();

//url sortener router
router.post("/", urlcontroller.generateNewShortURL);

//get the number of times link used
router.get("/analytics/:shortID", urlcontroller.getAnalytics);

module.exports = router;
