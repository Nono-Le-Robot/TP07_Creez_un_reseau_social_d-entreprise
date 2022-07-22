const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt : -1 })
};

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send("Post deleted : \n" + docs);
    else console.log("Delete error :" + err);
  });
};

module.exports.likePost = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (docs) => {
        res.status(200).send("Like success");
      }
    );
  } catch {}
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (docs) => {
        res.status(200).send("Unlike success");
      }
    );
  } catch {}
};

module.exports.commentPost =  async (req,res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try{
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push : {
          comments: {
            commenterId : req.body.commenterId,
            commenterFirstname : req.body.commenterFirstname,
            commenterLastname : req.body.commenterLastname,
            text : req.body.text,
            timestamp: new Date().getTime()
          }
        }
      },
      { new : true },
      (err, docs) => {
        res.status(201).send("commentaire posté : " + req.body.text)
      }
      )
  }
  catch{}
}

module.exports.editCommentPost = async (req,res)=> {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try{
    await PostModel.findById(
      req.params.id,
      {},
      {new : true},
      (err, docs) => {
        if(!err) return res.send(docs);
        else return res.stratus(400).send(err)
      }
    )
  }
  catch{

  }
}

module.exports.deleteCommentPost = async (req,res)=> {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
}

  //3:28:12