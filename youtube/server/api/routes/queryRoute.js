const router = require('express').Router()
const recommendedScraper = require('../middleware/scraper').recommendedScraper

router.get('/recommended/:videoId', recommendedScraper('https://www.youtube.com/watch?v='),(req, res, next) => {
    res.status(200).json({contents:req.videos})
})

module.exports = router