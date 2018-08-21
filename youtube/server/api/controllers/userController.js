const connection = require('../../config/connection')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

module.exports = {
    // This function is used to Sign up users
    registerUser(req, res, next) {
        const { username, password } = req.body
        if(username.length < 5) res.status(402).json({message:'Username should be 5 char or more'})
        if(password.length < 5) res.status(402).json({message:'Password should be 5 char or more'})
        if(req.users.length >= 1) { // This checks if a username has already been registered
            res.status(409).json({message: `Username already been created`})
        } else {
            // if username doesn't exist create and new user and hash there password.
            const saltRounds = 10
            bcrypt.hash(password, saltRounds, (err, hash) => { // This takes in the users password and hashes it 
                if(!err) {                                     // because hashes can be decoded a salt is added to prevent that
                    const createUserQuery = `INSERT INTO users (user_id, username, password)
                                                VALUES(?, ?, ?)`
                    connection.query(createUserQuery,[uuid.v4(), username, hash], (err, resp) => { // This creates the user and uses the hash as the password
                        if(!err) {
                            res.status(200).json({message: 'User has been successfully added'})
                        } else {
                            res.status(500).json({message: 'User failed to be added'})
                            console.log(err)
                        }
                    })
                } else {
                    res.status(500).json({message: 'User failed to be added'})
                }
            })
        }
    },


    // This function signs in the user
    signInUser(req, res, next) {
        const { username, password } = req.body
        if(req.users.length < 1) return res.status(404).json({message:'User not found'})

        // this compares the users password and the found users(username) password.
        bcrypt.compare(password, req.users[0].password, (err, result) => {
            // Checks to see if there is an err in the parameters
            if(err) return res.status(404).json({message:'Password Failed'})
            //  if the password passes this code block will create a JWT and return it to the client
            if(result) {
                /*
                    Using a token helps the cleint verify if the user is authenticated throughout there 
                    experience through the website and because the server is completely stateless meaning
                    it does not store any data the token will help for those reasons to help the user access
                    things that it can.
                
                    * The token is a mixture of the users information put in to a token which
                      is a peice of JSON data + Signature. If the token is modified the server has
                      its own private/public key to make sure that it is verified.

                    */

                const token = jwt.sign({
                    username: req.users[0].username,  // This first parameter is the payload so what we want to pass into the token
                    user_id: req.users[0].user_id  // I am generating the token with the users username and user_id
                }, process.env.JWT_KEY, { // In this argument we pass a "secret" key which is only known to the server
                    expiresIn: "1hr" }) // [OPTIONS] The expiration date of how long the token should last
                return res.status(200).json({message:'Auth successful', token})
            }
            // If the passwords don't match a message to the user Auth Failed will be returned back to the client
            res.status(404).json({message:'Password Failed'})
        })
    },

    // This function saves the users video and the parameter makes sure what to save to such as (history, likes, history)
    saveUserVideo(table) { // This parameter takes in the table it wants to save to.
        return (req, res, next) => {
            const { user_id, video_id } = req.body
            const insertQuery = `INSERT INTO ${table}(user_id, video_id) 
                                Values(?, ?)`
            connection.query(insertQuery,[user_id, video_id], (err, result) => {
                if(err) res.status(500).json({message:'Auth failed'})
                else res.status(200).json({result})
            })
        }  
    },
    // Get videos of a certain category depending on the table
    getVideos(table) {
        return (req, res, next) => {
            connection.query(`SELECT * FROM ${table}`, (err, videos) => {
                if(err) return res.status(500).json({message: err})
                else return res.status(200).json({videos})
            })
        }
    }

}