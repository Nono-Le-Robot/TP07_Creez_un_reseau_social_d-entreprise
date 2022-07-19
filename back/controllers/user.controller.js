const userModel = require('../models/user.model');
const UserModel = require ('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res) => {
    //récupére les données des utilisateurs (sauf le mot de passe)
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

module.exports.updateUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        await UserModel.findOneAndUpdate(
            {_id : req.params.id},
            {$set:{bio: req.body.bio}},
            {new: true, upsert : true , setDefaultsOnInsert: true},
            (err, docs) => {
                if(!err) return res.send(docs)
                // if(err) return res.status(500).send({message : err})
            }
        )
    }
    catch(err){console.log(err);}
}

module.exports.deleteUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
    try{
    await userModel.remove({_id : req.params.id}).exec();
    res.status(200).json({message : "delete success!"})
    }
    catch(err){if(err) return res.status(500).json({message : err})}
}

module.exports.follow = async (req, res) => {
    if(!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
    return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        // ajouter a la liste des followers
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet : { following : req.body.idToFollow}},
            { new : true, upsert : true},
        )
        //ajouter a la liste des following
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
            // retirer de la liste des followers
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