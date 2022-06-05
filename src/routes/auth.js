const {User} = require("../schema/auth");
console.log(User);
const express = require("express");

const user = express.Router();

module.exports = user;