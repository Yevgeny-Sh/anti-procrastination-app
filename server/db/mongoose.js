const mongoose = require("mongoose");
const keys = require("../config/keys");

//connect to cluster
mongoose.connect(
  `mongodb+srv://yevgeny:yevgeny1234@cluster0.mzerb.mongodb.net/procrastination?retryWrites=true&w=majority`,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
//mongoose.connect("mongodb://127.0.0.1:27017/users", {});
console.log("connected to db");
