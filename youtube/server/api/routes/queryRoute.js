const router = require('express').Router()
const { youtubeScraper, recommendedScraper } = require('../middleware/scraper')

router.get('/result', youtubeScraper('https://www.youtube.com/results?search_query='),(req, res, next) => {
    res.status(200).json(req.videos)
})

router.get('/recommended/:videoId', recommendedScraper('https://www.youtube.com/watch?v='),(req, res, next) => {
    res.status(200).json(req.videos)
})

module.exports = router