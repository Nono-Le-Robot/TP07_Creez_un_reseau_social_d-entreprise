const router = require('express').Router();
const postController = require('../controllers/post.controller')
const multerPost = require('../middleware/multerPost')

const jwt = require('jsonwebtoken')

function authenticateToken (req, res ,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).send('token not found');
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(401).send('invalid token')
        }
        req.user = user;
        next();
    });
}

router.get('/me', authenticateToken, (req,res,next) => {
    res.send(req.user)
})

router.get("/", authenticateToken, postController.readPost)
router.get('/:id', authenticateToken, postController.readOnePost)
router.post("/", authenticateToken, multerPost, postController.createPost)
router.put("/:id",authenticateToken,  multerPost, postController.updatePost)
router.delete("/:id",authenticateToken, postController.deletePost)
router.patch('/like-post/:id',authenticateToken, postController.likePost)
router.patch('/unlike-post/:id',authenticateToken, postController.unlikePost)

router.patch('/comment-post/:id',authenticateToken, postController.commentPost )
router.patch('/edit-comment-post/:id',authenticateToken, postController.editCommentPost )
router.patch('/delete-comment-post/:id',authenticateToken, postController.deleteCommentPost )

module.exports = router;