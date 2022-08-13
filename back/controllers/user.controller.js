const UserModel = require ('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs')

module.exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users)
}

module.exports.getOneUser = async (req,res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    UserModel.findById(req.params.id,(err, docs) => {
        if(!err) res.send(docs)
        else console.log('ID unknown : ' + err)
    }).select('-password')
}

module.exports.updateUser = (req, res) => {
    const updatedRecord = {
        picture: req.file != null ?`${req.protocol}://${req.get("host")}/images/profil/${req.file.filename}`: "http://localhost:5000/images/default/default.png",
    };
    UserModel.findById( req.params.id)
    .then((user) => {
        const userToModify = user._id.toString()
        const connectedUser = req.user.data._id
        if(userToModify === connectedUser || connectedUser === '62f2ae7fd2fc5c1305443984'){
            UserModel.findByIdAndUpdate(
                req.params.id,
                { $set: updatedRecord })
                .then(() => {
                    let pictureUrl = user.picture
                    if(pictureUrl){
                        if(pictureUrl.includes('default')=== false){
                            let newString = pictureUrl.slice(22)
                            fs.unlink(`${newString}`, () => {
                            });
                        }
                    }
                })
                .catch()
                if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
        UserModel.findOneAndUpdate(
            {_id : req.params.id},
        {$set:{
            picture: req.file != null ?`${req.protocol}://${req.get("host")}/images/profil/${req.file.filename}`: "http://localhost:5000/images/default/default.png",
        }},
        {new: true, upsert : true , setDefaultsOnInsert: true},
    )
    .then((user) => {
        res.status(200).send(user)
    })
    .catch()
        }
        else
        {
            return res.status(400).send('unauthorized request')
        }
    })
    .catch()
    
};

module.exports.deleteUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        await UserModel.deleteOne({_id : req.params.id}).exec();
        res.status(200).json({message : "delete success!"})
    }
    catch(err){if(err) return res.status(500).json({message : err.message})}
}

module.exports.follow = async (req, res) => {
    if(!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
    return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet : { following : req.body.idToFollow}},
            { new : true, upsert : true},
        )
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet : { followers : req.params.id}},
            { new : true, upsert : true},
            (err, docs) => {
                if (!err) res.status(201).json("follow success");
                else if(err) return res.status(400).json(err)
            }
        )
    }
    catch(err){}
}

module.exports.unfollow = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)|| !ObjectId.isValid(req.body.idToUnfollow))
    return res.status(400).send('ID unknown : ' + req.params.id)
    try{
            await UserModel.findByIdAndUpdate(
                req.params.id,
                { $pull : { following : req.body.idToUnfollow}},
                { new : true, upsert : true},
            )
            await UserModel.findByIdAndUpdate(
                req.body.idToUnfollow,
                { $pull : { followers : req.params.id}},
                { new : true, upsert : true},
                (err, docs) => {
                    if (!err) res.status(201).json("unfollow success");
                    else if(err) return res.status(400).json(err)
                }
            )
    }
    catch(err){}
}