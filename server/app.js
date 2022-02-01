const express = require("express");

const cors = require("cors");
const path = require("path");
const router = require("../server/routes/user.route");

const app = express();

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "build");
//app.use(cors());
//to prevent cors issue on development env (instead of cors())
//to not be used on actual production env outside Heroku
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());

app.use(router);

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
