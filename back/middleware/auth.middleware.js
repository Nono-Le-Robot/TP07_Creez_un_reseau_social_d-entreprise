const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge : 1})
                next()
            } 
            else{
                let user = await userModel.findById(decodedToken.userId)
                res.locals.user = user
                next()
            }
        })
    }
    else  {
        res.locals.user = null
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.params.id
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(400).json('token not found')
            } 
            else{
                res.status(200).send(decodedToken.userId)
                console.log(decodedToken.userId);
                next()
            }
        })
    }
    else{
        console.log('token  not found')
        res.status(404).json('token not found')
        next()
    }
}