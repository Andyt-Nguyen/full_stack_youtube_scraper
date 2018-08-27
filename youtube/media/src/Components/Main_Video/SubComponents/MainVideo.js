import React from 'react'

export default ({videoId}) => (
    <div className="video-container">
         <iframe src={`http://www.youtube.com/embed/${videoId}`} width="853" height="480" frameBorder="0" allowFullScreen />
    </div>
)