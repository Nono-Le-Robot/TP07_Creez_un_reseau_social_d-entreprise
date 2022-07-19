const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
    picture : {
        type : String, 
        trim : true, 
        default : "./uploads/profil/random-user.png"
    },
    followers : {
        type : [String]
    },
    following : {
        type : [String]
    },
    likes : {
        type : [String]
    }
},{
    timestamps : true
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

module.exports = mongoose.model('User', userSchema)