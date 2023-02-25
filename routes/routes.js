const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const middleware = require("../controllers/Middleware");

// all postman

// CREATE ACTIONS
// create a new user
router.post("/user/new", middleware.verifyUserData, UserController.newUser);
// signing in a new user
router.post("/user/login", UserController.login);
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
