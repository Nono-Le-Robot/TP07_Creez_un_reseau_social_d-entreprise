const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");

exports.uploadProfil = async (req, res) => {
    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set : {picture: `${req.protocol}://${req.get("host")}/images/picture/${req.file.filename}`}
            },
            {new:true, upsert : true , setDefaultsOnInsert : true},
            (err,docs) => {
               console.log(req.file.filename);
               if (!err) return res.send(docs);
               else return res.status(500).send({ message: err})
               
           }
       )
     }catch (err) {
       return res.status(500).send({ message: err.message})
     }
}




