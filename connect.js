const mongoose = require("mongoose");

//connect to database
async function connectToDatabase(url) {
  return mongoose.connect(url);
}

module.exports = { connectToDatabase };
