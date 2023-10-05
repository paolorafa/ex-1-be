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
        type: String,
        default:"https://media.gqitalia.it/photos/5ec3ca47a63ee8cb452d9ce4/master/w_1600%2Cc_limit/Avatar.jpg"
    }

}, {timestamps: true, strict:true})

module.exports = mongoose.model('authorModel', AuthorSchema, 'authors')