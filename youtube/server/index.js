const express = require('express') 
const path = require('path')
const bodyParser = require('body-parser') // parses incoming json
const mysql = require('mysql2') // mysql db
const cors = require('cors') // allow cross origin sites
const morgan = require('morgan') // logs the time of each route
const fs = require('fs') // read and write files
const app = express() // create instance of express()
const PORT = process.env.PORT || 5000 // heroku inserts ther env port
const frontPageRoutes = require('./api/routes/frontPageRoute') // youtube front page routes
const userRoute = require('./api/routes/userRoute')
const queryRoute = require('./api/routes/queryRoute')

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Allow CORS
app.use(cors())


// Api Routes
app.use("/uploads",express.static(__dirname+'/uploads'))
app.use('/api/frontpage',frontPageRoutes)
app.use('/api/users', userRoute)
app.use('/api/query', queryRoute)



// error handling
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})


app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({error:{
        message: err.message
    }})
})


app.listen(PORT, () => console.log(`The server is now listening on port ${PORT}...`))


//Long way of activating cors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     )
//     if(req.method === 'OPTIONS') {
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
//     return res.status(200).json({})
//     }
//     next()
// })
