import React from 'react'
import UpNext from './SubComponents/UpNext'
import Video from './SubComponents/Video';

export default () => (
    <div className="rec_vid_container">
        <UpNext />
        <Video />
        <Video />
        <Video />
        <Video />
    </div>
)