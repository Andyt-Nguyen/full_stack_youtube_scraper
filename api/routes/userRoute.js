const router = require('express').Router()
const { registerUser, signInUser, saveUserVideo, getUserVideoCateg, uploadImage,deleteVideo } = require('../controllers/userController')
const { getUsers, getUsersInfo, getVideos } = require('../middleware/getUsers')
const validate = require('../middleware/check_auth')
const upload = require('../middleware/storingImages')


// Registering & Logging Users
router.post('/register', getUsers, registerUser) // register users
router.post('/signin', getUsers, signInUser) // sign up users

// Updating Picutes
router.put('/upload_bg_img/:userId', validate, upload.single('bg_images'), uploadImage('bg_image'))
router.put('/upload_avatar_img/:userId', validate, upload.single('bg_images'), uploadImage('avatar_image'), (req, res) => {
    res.json({test:'tester'})
})

// Saving Videos
router.post('/saveHistory', validate, getVideos('user_history'), saveUserVideo('user_history')) // add to user history
router.post('/saveFavorites', validate, getVideos('user_favorites'), saveUserVideo('user_favorites')) // add to user favorites
router.post('/saveLikes', validate, getVideos('user_likes'), saveUserVideo('user_likes')) // add to user likes


// Deleting Videos
router.delete('/removeLikes/:videoId', validate, deleteVideo('user_likes'))
router.delete('/removeFavs/:videoId', validate, deleteVideo('user_favorites'))


// Getting Videos
router.get('/getUserLikes/:username', getUsersInfo, getUserVideoCateg('user_likes')) // get the user likes
router.get('/getUserHistory/:username', getUsersInfo, getUserVideoCateg('user_history')) // get the users history
router.get('/getUserFavorites/:username', getUsersInfo, getUserVideoCateg('user_favorites')) // get user favorites

// Getting users info
router.get('/getUsersInfo/:username', getUsersInfo, (req, res) => res.json(req.users));

module.exports = router