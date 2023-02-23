const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// all postman

// CREATE ACTIONS
// create a new user
router.post("/user/new", UserController.newUser);
// creating a new post
router.post("/post/new", UserController.newPost);
// creating a new comment
router.post("/comment/new", UserController.newComment);

// READ ACTIONS
// get specific post data
router.get("/posts/:postID/:userID", UserController.retrievePosts);
// get specific user data
router.get("/comment/:userID", UserController.getUser);
// get all posts
router.get("/posts/all", UserController.getAllPosts);

// testing route to get all comments!
// router.post("/get", UserController.retrieveComments);

module.exports = router;
