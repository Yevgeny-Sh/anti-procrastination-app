const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//!the auth tokens are sent in the header
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "hello");
    //decoded now contains user
    //the second arg is a string called - "secret"
    //TODO should be stored as a env variable, hidden in the config folder
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    //console.log(user);
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
