const connection = require('../../config/connection')

module.exports = {
    getUsers(req, res, next) {
        const { username } = req.body
        // Checks if there are any users that have that same username and pushes it into an array
        const QUERY = `SELECT * FROM users WHERE username = ?`
        connection.query(QUERY,[username], (err, response) => {
            if(err) {
                res.status(500).json({message:err})

            } else {
                req.users = response
                next()
            }
        })
    },

    
    getVideos(table) {
        return (req, res, next) => {
            const { video_id,username } = req.body
            const QUERY = `SELECT video_id FROM ${table} WHERE video_id = ? and username = ?`
            connection.query(QUERY,[video_id, username], (err, response) => {
                if(err) return res.status(500).json({message:err})
                else {
                    req.videos = response;
                    next()
                }
            })
        }
    }
}