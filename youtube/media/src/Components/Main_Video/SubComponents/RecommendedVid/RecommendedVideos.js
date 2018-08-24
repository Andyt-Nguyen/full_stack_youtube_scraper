import React from 'react'
import UpNext from './SubComponents/UpNext'
import Video from './SubComponents/Video';

export default ({children}) => (
    <div className="rec_vid_container">
        <UpNext />
        { children }
    </div>
)