const UserModel = require('../models/user.model')

module.exports.signUp = async (req,res) => {
    const {firstname, lastname, email , password} = req.body
    try{
        const user = await UserModel.create({firstname, lastname,  email , password})
        res.status(201).json({user : user._id})
    }
    catch(err) {
        res.status(200).send({ err })
    }
}
