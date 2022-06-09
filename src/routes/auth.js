const User = require("../schema/auth");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middlewares/checkLogin");
// CREATE A NEW USER
const user = express.Router();
user.post("/signup", async (req, res) => {
  const { name, username, email, password, avatar } = req.body;
  if (!name, !username, !email, !password) {
    return res.status(500).json({
      error: "All field is required!"
    });
  }

  try {
    const existEmail = await User.findOne({ email });
    const existUsername = await User.findOne({ username });
    if (existUsername || existEmail) {
      return res.status(403).json({
        error: "User already exist"
      })
    }
    const newUser = new User({
      name,
      username,
      email,
      password,
      avatar
    })
    const saveUser = await newUser.save();
    if (saveUser) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "Failed to registered" });
    }
  } catch (err) {
    console.log(err);
  }
})

// LOGIN USER
user.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    // let token
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const userLogging = await User.findOne({ username });
    console.log(userLogging);
    if (userLogging) {
      const isMatch = await bcrypt.compare(password, userLogging.password);
      // token = await userLogging.generateAuthToken();
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        const token = jwt.sign({
          username: userLogging.username,
          userId: userLogging._id
        }, process.env.SECRET_JWT_KEY, {
          expiresIn: "7d"
        });
        res.status(200).json({
          "message": "User Login Successfully",
          "token": token
        });
      }
    } else {
      return res.status(400).json({ error: "User does not Found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET ALL USERS
user.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    if (data) {
      res.status(200).json({ data, message: "User Loaded successfully!  " });
    }
    else {
      res.status(500).json({ error: "Failed to get all users" });
    }
  } catch (err) {
    console.log(err);
  }
})
// GET ALL LOGIN USER DATA
user.get("/profile", checkLogin, async (req, res) => {
  
  try {
    const userData = await User.findOne({ _id: req.userId, username: req.username });
    if (userData) {
      res.status(200).json({
        userData
      });
    } else {
      res.status(404).json({
        error: "User not found"
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = user;