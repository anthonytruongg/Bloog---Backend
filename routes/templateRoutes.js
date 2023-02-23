const express = require("express");
const router = express.Router();
const User = require("../model/user");

// Getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Getting one user
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// Creating one user
router.post("/", async (req, res) => {
  const { name, email, role } = req.body;

  const user = new User({
    name,
    email,
    role,
  });

  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Updating one user
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  try {
    const updatedUser = await res.user.save();
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Deleting one user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({
        message: "Cannot find user",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }

  res.user = user;
  // move onto the next piece of middleware
  next();
}

// testing function with postman
const retrieveComments = async (req, res) => {
  const { postID } = req.body;
  // find all the comments of postID
  const comment = await Comment.find({ postId: postID });
  // .populate({
  //   path: "userId",
  //   select: ["name"],
  // });
  try {
    console.log(comment);
    res
      .status(201)
      .send({ message: "retrieve comment API hit", comment: comment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  // in order to populate the posts' comments, i first needed to
  // create the comment itself with a userID, and a postID. This
  // allows the database to set up a reference between the two.
  // Once the postId is posted, I find the comment by using the postId,
  // then I specify a populate method with the path of comment.
};

// using this function to get the author of the post. the userID is passed
// from the card component into the viewpost component, and i make a get
// request to find the author of that post in this function.
const retrievePosts = async (req, res) => {
  const { userID, postID } = req.params;
  // const user = await User.find({ _id: userID });
  const post = await Post.find({ userId: userID })
    // .sort({ createdAt: -1 })
    // populate the path of userId from post schema
    // and this references the user so we can see
    // all user details
    .populate({ path: "userId", select: ["name"] });

  const comment = await Comment.find({ postId: postID });
  try {
    console.log(post);
    res.status(201).send({ post, comment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = router;
