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
                let user = await userModel.findById(decodedToken.id)
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
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                res.status(400).json('no token')
            } 
            else{
                res.status(200).json(decodedToken.id)
                console.log(decodedToken.id);
                next()
            }
        })
    }
    else{
        console.log('no token')
        res.status(400).json('no token')
        next()
    }
}