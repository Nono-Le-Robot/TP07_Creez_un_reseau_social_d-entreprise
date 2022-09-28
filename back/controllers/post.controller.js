const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require('fs')


module.exports.readPost = (req, res) => {
  PostModel.find().sort({ createdAt : -1 })
  .then(findPosts => {
    res.status(200).json({requestById : req.user.data._id , allPosts : findPosts})
  })
  
  .catch(error => res.status(404).json({ error }))
};

module.exports.readOnePost = (req, res) => {
  PostModel.findById(req.params.id)
  .then(findPosts => {
    res.status(200).json({requestById : req.user.data._id , post : findPosts})
  })
  .catch(error => res.status(404).json({ error }))
};

module.exports.createPost = (req, res) => {
  const date = new Date(Date.now())
  const days = date.toLocaleDateString()
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const finalDate = `${days} à ${hours}:${minutes}`
  const newPost = new PostModel({
  posterId: req.body.posterId,
  posterFirstname : req.body.posterFirstname,
  posterLastname : req.body.posterLastname,
  posterProfil : req.body.posterProfil,
  message: req.body.message,
  video: req.body.video,
  likers: [],
  selected : false,
  comments: [],
  picture: req.file != null ?`https://${req.get("host")}/back/portfolio/groupomania/images/post/${req.file.filename}`: "https://sannier-renaud.fr/back/portfolio/groupomania/images/default/deleted-picture.jpg",
  date: finalDate
  })
  newPost.save()
  .then((postCreated) => { 
    res.status(200).json({requestById : req.user.data._id , createdPost : postCreated});
  })
  .catch(error =>res.status(400).json({ error }))
}

module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  PostModel.findById(req.params.id)
  .then((post) => {
    const postedBy = post.posterId
    const connectedUser = req.user.data._id
    if(postedBy === connectedUser || connectedUser === '62f2ae7fd2fc5c1305443984'){
    const updatedRecord = {
    message: req.body.message,
    picture: req.file != null ?`https://${req.get("host")}/back/portfolio/groupomania/images/post/${req.file.filename}`: req.body.picture,
    posterProfil : req.body.posterProfil
    };
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true })
    .then((updatedPost) => {
      let pictureUrl = post.picture
      if(pictureUrl){
        if(req.file){
          if(pictureUrl === 'https://sannier-renaud.fr/back/portfolio/groupomania/images/default/deleted-picture.jpg'){
          }
          else{
            let newString = pictureUrl.slice(22)
            newString = newString.split(' ').join('_')
            fs.unlink(`${newString}`, () => {
            });
          }
        }
        else if(req.body.picture === 'https://sannier-renaud.fr/back/portfolio/groupomania/images/default/deleted-picture.jpg'){
          let newString = pictureUrl.slice(22)
          newString = newString.split(' ').join('_')
          fs.unlink(`${newString}`, () => {
          });
        }
      }
      res.status(201).send(updatedPost);
    })
    .catch((err) => res.status(400).send(err))
  }
  })
  .catch((err) => res.status(400).send(err))
};

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  PostModel.findById(req.params.id)
  .then((post) =>{
    const postedBy = post.posterId
    const connectedUser = req.user.data._id
    if(postedBy === connectedUser || connectedUser === '62f2ae7fd2fc5c1305443984'){
      let newString = post.picture.slice(22)
      newString = newString.split(' ').join('_')
      if(post.picture != null){
        if(post.picture === 'https://sannier-renaud.fr/back/portfolio/groupomania/images/default/deleted-picture.jpg'){
          PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
            if(!err) res.status(200).json({requestById : req.user.data._id , deletedPost : docs });
            else res.status(400).send("Delete error :" + err);
          })
        }
        else{
          fs.unlink(`${newString}`, () => {
            PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
              if(!err) res.status(200).json({requestById : req.user.data._id , deletedPost : docs });
              else res.status(400).send("Delete error :" + err);
            }) 
          });
        }
      }
      else{
        PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
          if(!err) res.status(200).json({requestById : req.user.data._id , deletedPost : docs });
          else res.status(400).send("Delete error :" + err);
        })
      }
    }
    else res.status(400).send('unauthorized request')
  })
  .catch((err) => res.status(400).send(err))
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
  } 
  catch {}
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
  } 
  catch {}
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