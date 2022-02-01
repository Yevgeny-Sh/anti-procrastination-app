const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isActive: Boolean,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
//userSchema.methods.myMethod
//add method to an Instance of a User Model
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "hello");
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
//removes password & tokens array from user
userSchema.methods.toJSON = function () {
  //!reminder: exprss converts  objects to json before he seends them as response

  const user = this;
  //!so this line is neccecery
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//adds a method to User Model
userSchema.statics.findByCredentials = async (name, password) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("users", userSchema);

module.exports = User;
