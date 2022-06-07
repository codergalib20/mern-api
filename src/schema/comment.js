const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    postId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    }

})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;