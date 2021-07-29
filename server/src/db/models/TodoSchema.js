let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  todo: { type: String, required: true },
  todoImg: { type: String, required: false, default: "none" },
  userId: { type: String, required: true },
});

let TodoSchema = mongoose.model("Todo", schema);

module.exports = TodoSchema;
