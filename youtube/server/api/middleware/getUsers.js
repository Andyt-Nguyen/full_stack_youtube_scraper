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
    }
}