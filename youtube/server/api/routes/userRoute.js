const router = require('express').Router()
const { registerUser, signInUser, saveUserVideo, getUserVideoCateg } = require('../controllers/userController')
const { getUsers } = require('../middleware/getUsers')
const validate = require('../middleware/check_auth')

// Post routes
router.post('/register', getUsers, registerUser) // register users
router.post('/signin', getUsers, signInUser) // sign up users
router.post('/saveHistory', validate, saveUserVideo('user_history')) // add to user history
router.post('/saveFavorites', validate, saveUserVideo('user_favorites')) // add to user favorites
router.post('/saveLikes', validate, saveUserVideo('user_likes')) // add to user likes


router.get('/getUserLikes', validate, getUserVideoCateg('user_likes')) // get the user likes
router.get('/getUserHistory', validate, getUserVideoCateg('user_history')) // get the users history
router.get('/getUserFavorites', validate, getUserVideoCateg('user_favorites')) // get user favorites


module.exports = router