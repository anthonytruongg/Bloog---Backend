const User = require("../model/user");

const verifyUserData = (req, res, next) => {
  const re = /\S+@\S+\.\S+/;
  const { username, password, email } = req.body;

  if (username.length < 3) {
    return res.status(400).send("Username must be at least 3 characters long!");
  }
  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long!");
  }
  if (email !== "") {
    if (!re.test(email)) {
      return res.status(400).send("Please enter a valid email!");
    }
  }

  next();
};

module.exports = {
  verifyUserData,
};
