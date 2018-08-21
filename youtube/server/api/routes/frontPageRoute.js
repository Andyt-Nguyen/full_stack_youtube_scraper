const youtubeScraper = require('../middleware/scraper').youtubeScraper
const validate = require('../middleware/check_auth')
const router = require('express').Router()

// Route to get the trending page
router.get('/trending', youtubeScraper('https://www.youtube.com/feed/trending'), (req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

// Route to get the comedy through search
router.get('/comedy', youtubeScraper('https://www.youtube.com/results?search_query=comedy'), (req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

// Route to get the gaming content through search
router.get('/gaming', youtubeScraper('https://www.youtube.com/results?search_query=gaming'), (req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

// Route to get the movies content through search
router.get('/movies', youtubeScraper('https://www.youtube.com/results?search_query=movies'), (req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

// Route to get the sports content through search
router.get('/sports', youtubeScraper('https://www.youtube.com/results?search_query=sports'), (req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

// Route to get the news content through search
router.get('/news', youtubeScraper('https://www.youtube.com/results?search_query=news'), (req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

module.exports = router

