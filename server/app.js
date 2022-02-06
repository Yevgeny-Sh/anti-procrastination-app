const express = require("express");

const cors = require("cors");
const path = require("path");
const userRouter = require("../server/routes/user.route");
const taskRouter = require("../server/routes/task.route");

const app = express();

//const cors=

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "build");
app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
