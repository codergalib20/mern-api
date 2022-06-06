const User = require("../schema/auth");
const express = require("express");
const bcrypt = require("bcryptjs");
// CREATE A NEW USER
const user = express.Router();
user.post("/signup", async (req, res) => {
    const { name, username, email, password, avatar } = req.body;
    if (!name, !username, !email, !password, !avatar) {
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
        if(saveUser){
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
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const userLogging = await User.findOne({ username });
    if (userLogging) {
      const isMatch = await bcrypt.compare(password, userLogging.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        res.status(200).json({ message: "User logged in successfully" });
      }
    } else {
      return res.status(400).json({ error: "User does not Found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = user;