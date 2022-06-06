const express = require("express");
const Post = require("../schema/post");
const post = express.Router();
post.post("/post", async (req, res) => {
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