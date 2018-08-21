const router = require('express').Router()
const { registerUser, signInUser, saveUserVideo, getVideos } = require('../controllers/userController')
const { getUsers } = require('../middleware/getUsers')
const validate = require('../middleware/check_auth')

// Post routes
router.post('/register', getUsers, registerUser) // register users
router.post('/signin', getUsers, signInUser) // sign up users
router.post('/saveHistory', validate, saveUserVideo('user_history')) // add to user history
router.post('/saveFavorites', validate, saveUserVideo('user_favorites')) // add to user favorites
router.post('/saveLikes', validate, saveUserVideo('user_likes')) // add to user likes


router.get('/getUserLikes', validate, getVideos('user_likes')) // get the user likes
router.get('/getUserHistory', validate, getVideos('user_history')) // get the users history
router.get('/getUserFavorites', validate, getVideos('user_favorites')) // get user favorites

module.exports = router