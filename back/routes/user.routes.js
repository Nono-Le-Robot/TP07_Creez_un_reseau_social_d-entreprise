const router = require('express').Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadProfilController = require ('../controllers/upload.controller')
const multerProfil = require("../middleware/multerProfil")

router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get("/logout", authController.logout)

router.get('/',  userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.put('/:id', multerProfil, userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

router.post('/upload', multerProfil, uploadProfilController.uploadProfil)

module.exports = router;