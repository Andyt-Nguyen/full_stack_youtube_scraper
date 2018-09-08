const request = require('request') // make api request
const cheerio = require('cheerio') // web crawler
const connection = require('../../config/connection')
const moment = require('moment') // makes timestamp
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

            const parsedUrl = req.query.search_query ? req.query.search_query : ''
            request(url + parsedUrl, (err, resp, html) => {

                if(!err && resp.statusCode == 200) {
                    const $ = cheerio.load(html)
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
                    console.log(err)
                    req.videos = [];
                    next()
                }
            })
        }
    },

    recommendedScraper(url) {
        return (req, res, next) => {
            let thumbnails = []
            let channelNames = []
            let videoDur = []
            let recViewCounts = []
            let videosIdArr = []
            let videoTitles = []
            let mainContent = []

            request(url + req.params.videoId, (err, resp, html) => {
                if(!err && resp.statusCode === 200) {
                    const $ = cheerio.load(html)
                    const content = $('.content-wrapper .content-link')
                    const recViewCount = $('.view-count')
                    const mainVideoTitle = $('.watch-title').text().replace(/\s\s+/g, '')
                    const mainVideoPublished = $('#watch-uploader-info').text()
                    const mainVideoDesc = $('#eow-description').html()
                    const mainVideoChannelName = $('.yt-user-info a').text()
                    const mainVideoThumbnail = $('#watch7-user-header img').data('thumb')
                    const mainVideoViews = $('#watch7-views-info .watch-view-count').text()
                    const mainVideoSubCount = $('.yt-subscriber-count').text()

                    let mainVideoContent = {
                        title:mainVideoTitle,
                        published:mainVideoPublished,
                        desc:mainVideoDesc,
                        channelName:mainVideoChannelName,
                        thumbnail:mainVideoThumbnail,
                        subCount:mainVideoSubCount,
                        viewCount:mainVideoViews }
                    
                    content.each((i, el) => {
                        let stringOfContent = $(el).text().replace(/\s\s+/g, '|||')
                        stringOfContent = stringOfContent.split('|||')
                        videoTitles.push(stringOfContent[1])
                        channelNames.push(stringOfContent[3])
                        videoDur.push(stringOfContent[2])
                    })
                    
                    recViewCount.each((i, el) => {
                        recViewCounts.push($(el).text())
                    })


                    const videoIds = $('.content-wrapper a')
                    videoIds.each((i, ele) => {
                        let link = $(ele).attr('href')
                        link = link.split('=')[1]
                        videosIdArr.push(link)
                    })

                    const thumbnail = $('.thumb-wrapper a span img')
                    thumbnail.each((e, ele) => {
                        thumbnails.push($(ele).data('thumb'))
                    })

                    for(let i = 0; i < videoTitles.length; i++) {
                        let videoContent = {
                            thumbnail: thumbnails[i],
                            channelName: channelNames[i],
                            duration: videoDur[i],
                            videoId: videosIdArr[i],
                            views: recViewCounts[i],
                            title: videoTitles[i]
                        }
                        mainContent.push(videoContent)
                    }
                    req.videos = [mainContent, mainVideoContent]
                    next()
                }
            })
        } 
    }
}