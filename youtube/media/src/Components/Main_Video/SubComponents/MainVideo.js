import React from 'react'

export default ({videoId}) => (
    <div className="video-container">
         <iframe
            onChange={(e) => e.target.playVideo()} 
            width="853" 
            height="480" 
            frameBorder="0" 
            allowFullScreen
            src={`http://www.youtube.com/embed/${videoId}`} allow="autoplay; encrypted-media" />
    </div>
)