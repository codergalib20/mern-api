const express = require("express");
const Post = require("../schema/post");
const posts = express.Router();
posts.post("/post", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        });
        const savePost = await newPost.save();
        if (savePost) {
            res.status(201).json({ message: "Post created successfully" });
        }
        else {
            res.status(500).json({ error: "Failed to create post" });
        }
    } catch (err) {
        console.log(err);
    }
})
// GET ALL POSTS
posts.get("/posts", async (req, res) => {
    try {
        const data = await Post.find();
        if (data) {
            res.status(200).json({ data, message: "Post Loaded successfully!  " });
        }
        else {
            res.status(500).json({ error: "Failed to get all posts" });
        }
    } catch (err) {
        console.log(err);
    }
})
module.exports = posts;