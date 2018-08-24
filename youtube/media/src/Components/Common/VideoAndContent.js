import React from 'react'
import { Link } from 'react-router-dom'
import Thumbnail from './Thumbnail';

export default ({title, channelName, lastUploaded, views, img, videoId, text_container, channel_name_style, container_style}) => (
    <div style={{...container_style}}>
        <Link to={`/watch_vod/${videoId}`}><Thumbnail img={img} /></Link>
        <div style={{width:'190px'}}>
            <p style={{fontFamily:'Roboto', paddingTop:'10px', fontSize:'14px', fontWeight:700}}>{title}</p>
            <div style={{marginTop:'10px', ...text_container}}>
                <p style={{fontFamily:'Roboto',fontSize:'14px', color:'#6e6e6e', fontWeight:400, ...channel_name_style}}>{channelName}</p>
                <p style={{fontFamily:'Roboto',fontSize:'14px', color:'#6e6e6e', fontWeight:400}}>{views} <span style={{fontSize:15}}>&middot;</span> {lastUploaded}</p>
            </div>
        </div>
    </div>
)