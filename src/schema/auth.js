const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
        select: false,
    },
    avatar: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
                select: false,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
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
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_JWT_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
const User = new mongoose.model("User", userSchema);
module.exports = User;