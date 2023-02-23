const User = require("../model/user");
const Post = require("../model/post");
const Comment = require("../model/comment");

const newUser = async (req, res) => {
  console.log("new user API HIT");
  const { name, email } = req.body;

  const user = new User({
    name,
    email,
  });

  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const newPost = async (req, res) => {
  console.log("new post API HIT");
  const { userId, title, body } = req.body;
  const post = new Post({
    userId,
    title,
    body,
  });
  try {
    const newPost = await post.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const newComment = async (req, res) => {
  console.log("new comment API hit");
  const { userId, postId, comment } = req.body;
  const newComment = new Comment({
    userId,
    postId,
    comment,
  });
  try {
    const saveComment = await newComment.save();
    res.status(201).send(saveComment);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const retrievePosts = async (req, res) => {
  console.log("retrieve posts API hit");
  const { userID, postID } = req.params;
  const post = await Post.find({ userId: userID }).populate({
    path: "userId",
    select: ["name"],
  });
  const comment = await Comment.find({ postId: postID });
  try {
    // console.log(post);
    res.status(201).send({ post, comment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  const post = await Post.find();
  try {
    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById({ _id: userID });

  try {
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  newUser,
  newPost,
  retrievePosts,
  getAllPosts,
  getUser,
  newComment,
};
