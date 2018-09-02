const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/uploads/')
    },

    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject file
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage, 
    limits:{fileSize: 1024 * 1024 * 10},
    fileFilter })


module.exports = upload;