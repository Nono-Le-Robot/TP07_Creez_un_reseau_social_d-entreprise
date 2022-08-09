const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')



const UserSchema = new mongoose.Schema({
    firstname : {
        type : String, 
        required: true,
        minLength: 2,
        maxLength: 55, 
        trim : true 
    },
    lastname : {
        type : String, 
        required: true,
        minLength: 2,
        maxLength: 55, 
        trim : true 
    },
    email : {
        type : String, 
        required: true,
        validate: [isEmail], 
        lowercase : true,
        trim : true, 
        unique : true
    },
    password : {
        type : String, 
        required: true, 
        trim : true, 
    },
    bio : {
        type : String
    },
    picture : {
        type : String, 
        trim : true, 
        default : "http://localhost:5000/images/default/default.png"
    },
    followers : {
        type : [String]
    },
    following : {
        type : [String]
    },
    likes : {
        type : [String]
    },
    date : {
        type : String
    }
},{
    timestamps : true
})


module.exports = mongoose.model('User', UserSchema)