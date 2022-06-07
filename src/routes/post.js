const express = require("express");
const Post = require("../schema/post");
const posts = express.Router();
posts.post("/post", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            username: req.body.username
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
// Delete post
posts.delete("/del/post/:id", async (req, res) => {
    console.log(req.params.id)
    try {
        const deletePost = await Post.deleteOne({ _id: req.params.id });
        if (deletePost) {
            res.status(200).json({
                message: "Post deleted successfully",
                data: deletePost
            });
        }
        else {
            res.status(500).json({ error: "Failed to delete post" });
        }
    } catch (err) {
        console.log(err);
    }
})
posts.patch("/update/post/:id", async (req, res) => {
    try {
        const updatePost = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (updatePost) {
            res.status(200).json({
                message: "Post updated successfully",
                data: updatePost
            });
        }
        else {
            res.status(500).json({ error: "Failed to update post" });
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = posts;