const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    posterId : {
        type : String, 
        required: true,
    },
    message : {
        type : String, 
        maxLength: 500, 
        trim : true 
    },
    picture : {
        type : String, 
    },
    video : {
        type : String,  
    },
    likers : {
        type : [String],
        required : true
    },
    comments : {
        type : [
            {
                commenterId : String,
                commenterFirstname : String,
                commenterLastname : String,
                text : String,
                timestamp : Number
            }
        ],
        required : true,
    }
},
{
    timestamps : true
},
{
    timestamps : true
})

module.exports = mongoose.model('Post', PostSchema)
