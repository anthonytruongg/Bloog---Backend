const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = CommentModel;
