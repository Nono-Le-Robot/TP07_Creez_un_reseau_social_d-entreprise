const router = require('express').Router();
const postController = require('../controllers/post.controller')
const multerPost = require('../middleware/multerPost')
const auth = require('../middleware/auth.middleware')


router.get('/me', auth.authenticateToken, (req,res,next) => {
    res.send(req.user)
})

router.get("/", auth.authenticateToken, postController.readPost)
router.get('/:id', auth.authenticateToken, postController.readOnePost)
router.post("/", auth.authenticateToken, multerPost, postController.createPost)
router.put("/:id",auth.authenticateToken,  multerPost, postController.updatePost)
router.delete("/:id",auth.authenticateToken, postController.deletePost)
router.patch('/like-post/:id',auth.authenticateToken, postController.likePost)
router.patch('/unlike-post/:id',auth.authenticateToken, postController.unlikePost)

router.patch('/comment-post/:id',auth.authenticateToken, postController.commentPost )
router.patch('/edit-comment-post/:id',auth.authenticateToken, postController.editCommentPost )
router.patch('/delete-comment-post/:id',auth.authenticateToken, postController.deleteCommentPost )

module.exports = router;