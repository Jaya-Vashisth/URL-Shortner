const { connectToDatabase } = require("./connect");
const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectToDatabase(
  "mongodb+srv://vashisthjaya00:passwordPV@cluster0.ung8nxn.mongodb.net/URL_Shorten?retryWrites=true&w=majority"
).then(() => console.log("Database connected"));

app.use(express.json());

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;

  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.use("/url", urlRoute);

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}.`);
});
