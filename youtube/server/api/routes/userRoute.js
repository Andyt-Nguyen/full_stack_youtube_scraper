const router = require('express').Router()
const { registerUser, signInUser, saveUserVideo, getUserVideoCateg, uploadUserBg } = require('../controllers/userController')
const { getUsers, getUsersInfo, getVideos } = require('../middleware/getUsers')
const validate = require('../middleware/check_auth')
const upload = require('../middleware/storingImages')


// Registering & Logging Users
router.post('/register', getUsers, registerUser) // register users
router.post('/signin', getUsers, signInUser) // sign up users

// Updating Picutes
router.put('/upload_bg_img', validate ,upload.single('bg_images'), uploadUserBg)


router.put('/upload_avatar_img', upload.single('avatar_images'), (req ,res, next) => {
    const QUERY = `UPDATE users SET avatar_image = ?`
    connection.query(QUERY,[req.file.path], (err, response) => console.log(response))
})

// Saving Videos
router.post('/saveHistory', validate, getVideos('user_history'), saveUserVideo('user_history')) // add to user history
router.post('/saveFavorites', validate, getVideos('user_favorites'), saveUserVideo('user_favorites')) // add to user favorites
router.post('/saveLikes', validate, getVideos('user_likes'), saveUserVideo('user_likes')) // add to user likes

// Getting Videos
router.get('/getUserLikes/:username', getUsersInfo, getUserVideoCateg('user_likes')) // get the user likes
router.get('/getUserHistory/:username', getUsersInfo, getUserVideoCateg('user_history')) // get the users history
router.get('/getUserFavorites/:username', getUsersInfo, getUserVideoCateg('user_favorites')) // get user favorites

// Getting users info
router.get('/getUsersInfo/:username', getUsersInfo, (req, res) => res.json(req.users));

module.exports = router