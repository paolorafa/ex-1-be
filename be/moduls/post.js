const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({


    category: {
        type: String
    },
    title: {
        type: String
    },
    images: {
        type: String,      
    },   
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"authorModel"
    }


}, { timestamps: true, strict:true})

module.exports = mongoose.model('postModel', PostSchema, 'posts')