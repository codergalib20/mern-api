const Comment = require('../schema/comment');
const express = require('express');
const comment = express.Router();
comment.post('/', async (req, res) => {
    try {
        const newComment = await new Comment({
            comment: req.body.comment,
            postId: req.body.postId,
            username: req.body.username,
            userImage: req.body.userImage
        });
        newComment.save().then(comment => {
            res.status(200).json({
                message: 'Comment added successfully',
                comment
            });
        });
    }
    catch (err) {
        res.status(400).send('Comment not create');
    }
})
comment.get('/:postId', async (req, res) => {
    try {
        const data = Comment.find({ postId: req.params.postId })
        res.status(200).json({
            data,
            message: "Comment Loaded"
        })
    } catch (err) {
        res.status(404).json({
            error: "Faild to comment Load"
        })
        console.log(err);
    }
})
module.exports = comment;
// ok
// ok