const mongoose = require("mongoose");

// in order to make a post, a userId must be submitted. that is how the collections reference each other.

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  dislikes: {
    type: Array,
    default: [],
  },
  // remove this?
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
