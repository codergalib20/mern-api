const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});
const Post = new mongoose.model("Post", postSchema);
module.exports = Post;