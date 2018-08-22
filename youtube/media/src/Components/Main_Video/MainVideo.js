import React from 'react'

export default ({videoId}) => (
    <div className="mainVideoStyle">
         <iframe src={`http://www.youtube.com/embed/${videoId}`} width="100%" height="100%" frameborder="0" allowfullscreen />
    </div>
)