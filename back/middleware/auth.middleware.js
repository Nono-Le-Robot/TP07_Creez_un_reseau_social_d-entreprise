const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM", async (err, decodedToken) => {
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


module.exports.authenticateToken = (req, res ,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).send('token not found');
    }
    jwt.verify(token, 'kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM', (err, user) => {
        if(err) {
            return res.status(401).send('invalid token')
        }
        req.user = user;
        next();
    });
}