const express = require('express') 
const path = require('path')
const bodyParser = require('body-parser') // parses incoming json
const mysql = require('mysql2') // mysql db
const cors = require('cors') // allow cross origin sites
const fs = require('fs') // read and write files
const app = express() // create instance of express()
const PORT = process.env.PORT || 5000 // heroku inserts ther env port
const frontPageRoutes = require('./api/routes/frontPageRoute') // youtube front page routes
const userRoute = require('./api/routes/userRoute')
const queryRoute = require('./api/routes/queryRoute')
// const morgan = require('morgan') // logs the time of each route

// Middleware
// app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Allow CORS
app.use(cors())


// Api Routes
app.use("/uploads",express.static(__dirname+'/uploads'))
app.use('/api/frontpage',frontPageRoutes)
app.use('/api/users', userRoute)
app.use('/api/query', queryRoute)
app.use(express.static(path.join(__dirname, 'NotFound')))
app.use(express.static(path.join(__dirname,'build_client')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// error handling
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})


app.use((err, req, res, next) => {
    // res.status(err.status || 500)
    res.sendFile(path.join(__dirname,'NotFound','404.html'))
})


app.listen(PORT, () => console.log(`The server is now listening on port ${PORT}...`))