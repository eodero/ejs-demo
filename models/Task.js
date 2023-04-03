const mongoose = require("mongoose");

//create schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//create model - instance of the model is called a document
module.exports = mongoose.model("Task", TaskSchema);
