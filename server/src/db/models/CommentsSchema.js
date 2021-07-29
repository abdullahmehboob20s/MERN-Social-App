let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  user_id: { type: String },
  post_id: { type: String },
  comment: { type: String },
});

let CommentsSchema = mongoose.model("comment", schema);

module.exports = CommentsSchema;
