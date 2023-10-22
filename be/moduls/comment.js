const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    comment: {
        type: String
    },
    rate:{
        type: Number
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authorModel"
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model('commentsModel', CommentSchema, 'comments');