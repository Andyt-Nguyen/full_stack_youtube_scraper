import React from 'react'
import ThumbNail from './ThumbNail'

export default () => (
    <div>
        <div className="rec_videos">
            <ThumbNail />
            <div style={{marginLeft:10}}>
                <p className="video_title">H3 Podcast #48 - Jordan Peterson</p>
                <p className="video_channel_title">Channel Title</p>
                <p className="video_views">1.8B views</p>
            </div>
        </div>        
    </div>
)