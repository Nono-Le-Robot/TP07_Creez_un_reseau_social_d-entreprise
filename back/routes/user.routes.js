const router = require('express').Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadProfilController = require ('../controllers/upload.controller')
const multerProfil = require("../middleware/multerProfil")
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

router.get('/me', authenticateToken, (req,res,next) => res.send(req.user))

router.post("/register", authController.signUp)
router.post("/login",  authController.signIn)
router.get("/logout", authController.logout)
router.get('/',  authenticateToken, userController.getAllUsers)
router.get('/:id',authenticateToken, userController.getOneUser)
router.put('/:id',authenticateToken, multerProfil, userController.updateUser)
router.delete('/:id', authenticateToken, userController.deleteUser)
router.patch('/follow/:id',authenticateToken, userController.follow)
router.patch('/unfollow/:id',authenticateToken, userController.unfollow)

router.post('/upload',authenticateToken, multerProfil, uploadProfilController.uploadProfil)

module.exports = router;0
