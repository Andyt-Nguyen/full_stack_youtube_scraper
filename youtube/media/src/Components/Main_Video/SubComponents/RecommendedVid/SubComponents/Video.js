import React from 'react'
import ThumbNail from './ThumbNail'

export default ({img, title, channel_name, views}) => (
    <div>
        <div className="rec_videos">
            <ThumbNail img={img} />
            <div style={{marginLeft:10, width:249}}>
                <p className="video_title">{title}</p>
                <p className="video_channel_title">{channel_name}</p>
                <p className="video_views">{views}</p>
            </div>
        </div>        
    </div>
)