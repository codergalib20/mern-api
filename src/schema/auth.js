const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
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
// Password save as hash
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const hash = await bcrypt.hash(this.password, 12);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});
const User = new mongoose.model("User", userSchema);
module.exports = User;