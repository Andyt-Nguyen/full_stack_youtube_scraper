import React from 'react'

export default ({videoId}) => (
    <div className="video-container">
         <iframe
            onChange={(e) => e.target.playVideo()} 
            src={`http://www.youtube.com/embed/${videoId}?autoplay=1`} width="853" height="480" frameBorder="0" allowFullScreen />
    </div>
)