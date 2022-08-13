const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const bcrypt = require("bcrypt")

module.exports.signUp = async (req,res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new UserModel({
            lastname : req.body.lastname.charAt(0).toUpperCase() + req.body.lastname.slice(1),
            firstname : req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1),
            email : req.body.email,
            password : hash
        })
        user.save()
        .then(() => res.status(201).json({message : 'Utilisateur créé !'}))
        .catch((err) => {
            const errors = signUpErrors(err)
            res.status(400).send(errors)
        })})
    .catch(error => res.status(400).json({error}))
}

module.exports.signIn = async (req,res) => {
    const durationTokenLogin = 31*24*60*60*1000 // expire in : 31 days
    UserModel.findOne({email : req.body.email})
    .then(user =>{
        if (!user){
            return res.status(401).json({error :  'Utilisateur non trouvé !'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error :  'Mot de passe incorrect ! '})
            } 


            function generateAcessToken(data){
                return jwt.sign({data} ,process.env.TOKEN_SECRET, {expiresIn : '30d'})
                // res.cookie("jwt",token,{httpOnly : true,  maxAge: durationTokenLogin})
            }
                const acessToken = generateAcessToken(user)
                res.status(200).json({userId : user._id, acessToken})
            
        })
        .catch(error =>  res.status(401).send(error.message))
    })
    .catch(error =>  res.status(401).send(error.message))
}

module.exports.logout = async (req,res) => {
    res.cookie('jwt', '', {maxAge: 1})  
    res.status(200).json("user disconnect")
}