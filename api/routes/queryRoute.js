const router = require('express').Router()
const { youtubeScraper, recommendedScraper } = require('../middleware/scraper')

router.get('/result', youtubeScraper('https://www.youtube.com/results?search_query='),(req, res, next) => {
    let filteredImages = req.videos.filter( a => a.thumbnail != undefined)
    res.status(200).json(filteredImages)
})

router.get('/recommended/:videoId', recommendedScraper('https://www.youtube.com/watch?v='),(req, res, next) => {
    res.status(200).json(req.videos)
})

module.exports = router