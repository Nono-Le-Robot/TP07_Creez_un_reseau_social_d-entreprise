const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.checkUser = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token){
<<<<<<< Updated upstream
        jwt.verify(token, "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM", async (err, decodedToken) => {
=======
        jwt.verify(token,  "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM", async (err, decodedToken) => {
>>>>>>> Stashed changes
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
    console.log(token);
    if(!token) {
        return res.status(401).send('token not found');
    }
<<<<<<< Updated upstream
    jwt.verify(token, 'kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM', (err, user) => {
=======
    jwt.verify(token, "kyQ4fG1W9DgXXjhJb8nA5pFt8FEY6VD0rBF40JlgAKoL2eYkiLTxps2SMXOJ4NTAJ5C0nM", (err, user) => {
>>>>>>> Stashed changes
        if(err) {
            return res.status(401).send('invalid token')
        }
        req.user = user;
        next();
    });
}