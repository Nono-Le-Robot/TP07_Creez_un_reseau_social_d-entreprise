const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find().sort({ createdAt : -1 })
  .then(findPosts => res.status(200).json(findPosts))
  .catch(error => res.status(404).json({ error }))

};

module.exports.createPost = (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: []
  });
  newPost.save()
  .then(() => { res.status(201).json({ message : 'post success'})})
  .catch(error =>res.status(400).json({ error }))
}

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

module.exports.editCommentPost = (req,res)=> {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
    PostModel.findById(
      req.params.id,
    )
    .then(docs => {
      const theComment = docs.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
      )
      if(!theComment) return res.status(404).send('comment not found')
      theComment.text = req.body.text
      return docs.save((err) => {
        if(!err) return res.status(200).send(docs)
        return res.status(500).send(err)
      })
    })
    .catch(err => res.status(400).send(err))
}

module.exports.deleteCommentPost = async (req,res)=> {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull : {
        comments : {
          _id : req.body.commentId
        }
      }
    },
    {new : true}
    )
    .then(docs => res.status(200).send(docs))
    .catch(err => res.status(400).send(err))
  }