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
    role:{
        type: String,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    },

    password:{
        type: String,
        required: true,
        min:6
       
    }
    

}, {timestamps: true, strict:true})

module.exports = mongoose.model('authorModel', AuthorSchema, 'authors')