const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true, //removes white space
  },
  category: {
    type: String,
    required: true,
  },
  importance: {
    type: Number,
    required: true,
  },
  urgency: {
    type: Number,
    required: true,
  },
  willingness: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: false,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Task;
