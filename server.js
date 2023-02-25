// .env files to hide important information
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// creating an express app
// middleware functions to parse incoming requests
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecting to MongoDB
const mongoose = require("mongoose");
const port = 3001;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// checking if connection is successful
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Connected to Database on port ${port} `));

// middleware is code that runs when server gets a request before being passed to routes

const userRoutes = require("./routes/routes");

app.use("/api", userRoutes);

app.listen(port, () => console.log("Server started!"));
