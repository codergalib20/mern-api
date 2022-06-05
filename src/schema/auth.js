const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
})

const User = new mongoose.model("User", userSchema);
module.exports = User;