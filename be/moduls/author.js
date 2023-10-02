const mongoose=require ('mongoose');

const AuthorSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    lastname: { 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type: String
    },
    avatar:{
        type: String
    }

}, {timestamps: true, strict:true})

module.exports = mongoose.model('authorModel', AuthorSchema, 'authors')