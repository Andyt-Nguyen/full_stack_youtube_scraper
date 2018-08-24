const request = require('request') // make api request
const cheerio = require('cheerio') // web crawler
const connection = require('../../config/connection')

module.exports = {
    youtubeScraper(url) {
        return (req, res, next) => {
            // Initialize video contents
            let theTitles = [] // contains the title of the video
            let thumbnailArr = [] // contains thumbnail url of the video
            let videoDur = [] // contains the video times of the video
            let videoDesc = [] // contains teh video desc
            let videoIdArr = [] // contains the video id of the video
            let videoChannel = [] // get channels names
            let lastUploadedArr = [] // get time of when video was last uploaded
            let viewsArr = [] // contains the views of the vod
            let mainContent = [] // Array that will combine all the content

            request(url, (err, resp, html) => {
                if(!err && resp.statusCode == 200) {
                    const $ = cheerio.load(html)
                    console.log(html)
                    const thumbnails = $('.yt-thumb-simple img') // use .data('thumb') for id.attr('href')
                    const videoTime = $('.video-time') // use .text()
                    const videoTitles = $('.yt-lockup-title a') // use .text()
                    const description = $('.yt-lockup-description') // use .text()
                    const lastUploaded = $('.yt-lockup-meta-info li:nth-child(1)') // use .text()
                    const views = $('.yt-lockup-meta-info li:nth-child(2)') // use .text()
                    const userChannel = $('.yt-lockup-byline a') // use .text()
    
                    userChannel.each((i,el) => {
                        const text = $(el).text()
                        videoChannel.push(text)
                    })

                    videoTime.each((i,el) => {
                        const link = $(el).text()
                        videoDur.push(link)
                    })

                    description.each((i,el) => {
                        const text = $(el).text()
                        videoDesc.push(text)
                    })

                    lastUploaded.each((i,el) => {
                        const text = $(el).text()
                        lastUploadedArr.push(text)
                    })

                    views.each((i,el) => {
                        const text = $(el).text()
                        viewsArr.push(text)
                    })
            
                    videoTitles.each( (i, el) => {
                        const title = $(el).text()
                        let link = $(el).attr('href')
                        theTitles.push(title)
                        link = link.split('/watch?v=')
                        videoIdArr.push(link[1])
                    })
            
                    thumbnails.each( (i, el) => {
                        const link = $(el).data('thumb')
                        thumbnailArr.push(link)
                    })

                    // console.log(theTitles)


                    for(let i = 0; i < theTitles.length; i++) {
                        let singleContent = {
                            title: theTitles[i],
                            description: videoDesc[i],
                            channelName: videoChannel[i],
                            lastUploaded: lastUploadedArr[i],
                            viewCount: viewsArr[i], 
                            thumbnail: thumbnailArr[i], 
                            videoDuration: videoDur[i], 
                            videoIds: videoIdArr[i]}
                            
                        mainContent.push(singleContent)
                    }
                    req.videos = mainContent
                    next()
                            
                } else {
                    res.status(404).json({message:err})
                }
            })
        }
    },

    recommendedScraper(url) {
        return (req, res, next) => {
            let thumbnails = []
            let channelNames = []
            let videoDur = []
            let views = []
            let videosIdArr = []
            let videoTitles = []
            let mainContent = []

            request(url, (err, resp, html) => {
                if(!err && resp.statusCode === 200) {
                    const $ = cheerio.load(html)
                    const content = $('.content-wrapper .content-link')
                    // console.log(html)
                    content.each((i, el) => {
                        let stringOfContent = $(el).text().replace(/\s\s+/g, '|||')
                        stringOfContent = stringOfContent.split('|||')
                        videoTitles.push(stringOfContent[1])
                        channelNames.push(stringOfContent[3])
                        videoDur.push(stringOfContent[2])
                        views.push(stringOfContent[4].split(' ')[0] +' views')
                    })

                    const videoIds = $('.content-wrapper a')
                    videoIds.each((i, ele) => {
                        const link = $(ele).attr('href')
                        videosIdArr.push(link)
                    })

                    const thumbnail = $('.thumb-wrapper a span img')
                    thumbnail.each((e, ele) => {
                        thumbnails.push($(ele).data('thumb'))
                    })

                    for(let i = 0; i < videoTitles.length; i++) {
                        let videoContent = {
                            thumbnails: thumbnails[i],
                            channelName: channelNames[i],
                            duration: videoDur[i],
                            videoId: videosIdArr[i],
                            views: views[i],
                            title: videoTitles[i]
                        }
                        mainContent.push(videoContent)
                    }
                    req.videos = mainContent
                    next()
                }
            })
        } 
    }
}