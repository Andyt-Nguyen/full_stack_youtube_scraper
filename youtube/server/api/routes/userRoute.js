const router = require('express').Router()
const { registerUser, signInUser, saveUserVideo, getUserVideoCateg } = require('../controllers/userController')
const { getUsers, getVideos } = require('../middleware/getUsers')
const validate = require('../middleware/check_auth')

// Post routes
router.post('/register', getUsers, registerUser) // register users
router.post('/signin', getUsers, signInUser) // sign up users

router.post('/saveHistory', validate, getVideos('user_history'), saveUserVideo('user_history')) // add to user history
router.post('/saveFavorites', validate, getVideos('user_favorites'), saveUserVideo('user_favorites')) // add to user favorites
router.post('/saveLikes', validate, getVideos('user_likes'), saveUserVideo('user_likes')) // add to user likes

router.get('/getUserLikes/:username', getUserVideoCateg('user_likes')) // get the user likes
router.get('/getUserHistory/:username', getUserVideoCateg('user_history')) // get the users history
router.get('/getUserFavorites/:username', getUserVideoCateg('user_favorites')) // get user favorites


module.exports = router