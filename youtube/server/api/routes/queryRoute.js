const router = require('express').Router()
const recommendedScraper = require('../middleware/scraper').recommendedScraper

router.get('/', recommendedScraper('https://www.youtube.com/watch?v=_1EOGuua9h0'),(req, res, next) => {
    res.status(200).json({contents:req.videos})
})

module.exports = router