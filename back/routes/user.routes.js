const router = require('express').Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadProfilController = require ('../controllers/upload.controller')
const multerProfil = require("../middleware/multerProfil")
const auth = require('../middleware/auth.middleware')

router.get('/me',auth.authenticateToken, (req,res,next) => res.send(req.user))

router.post("/register", authController.signUp)
router.post("/login",  authController.signIn)
router.get("/logout", authController.logout)
router.get('/', auth.authenticateToken,userController.getAllUsers)
router.get('/:id',auth.authenticateToken,userController.getOneUser)
router.put('/:id',auth.authenticateToken,multerProfil, userController.updateUser)
router.delete('/:id', auth.authenticateToken, userController.deleteUser)
router.patch('/follow/:id',auth.authenticateToken, userController.follow)
router.patch('/unfollow/:id',auth.authenticateToken,userController.unfollow)

router.post('/upload', multerProfil, uploadProfilController.uploadProfil)

module.exports = router;
