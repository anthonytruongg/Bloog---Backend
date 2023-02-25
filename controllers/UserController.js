const User = require("../model/user");
const Post = require("../model/post");
const Comment = require("../model/comment");
const bcrypt = require("bcrypt");
const verifyUserData = require("./Middleware");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("Email does not exist.");
  }
  if (user && user.status !== "Active") {
    return res.status(401).send("Please verify your account.");
  }

  const validPassword = bcrypt.compare(password, user.password);

  try {
    if (!validPassword) {
      return res.status(401).send("Email or password may be wrong.");
    }
    return res.status(200).send("User has successfully been logged in.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error.");
  }
};

const newUser = async (req, res) => {
  const { username, password, email } = req.body;

  const user = new User({
    name: username,
    email: email,
    password: password,
  });

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { name: username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).send("Email already exists!");
      }
      if (existingUser.name === username) {
        return res.status(409).send("Username already exists!");
      }
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    await user.save();
    return res.status(200).send("User registered!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error.");
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
  login,
};
