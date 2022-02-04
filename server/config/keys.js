if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);
  //production
  module.exports = require("./prod");
} else {
  //in development
  module.exports = require("./dev");
  console.log(process.env.NODE_ENV);
}
