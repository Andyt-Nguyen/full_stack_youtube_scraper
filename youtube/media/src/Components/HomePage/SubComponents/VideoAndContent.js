import React from 'react'
import { Link } from 'react-router-dom'
import Thumbnail from './Thumbnail';

export default ({title, channelName, lastUploaded, views, img, videoId}) => (
    <div>
        <Link to={{pathname:`/watch_vod/${videoId}`, state:{title,channelName,views,img,lastUploaded}}}><Thumbnail img={img} /></Link>
        <div style={{width:'190px'}}>
            <p style={{fontFamily:'Roboto', paddingTop:'10px', fontSize:'14px', fontWeight:700}}>{title}</p>
            <div style={{marginTop:'10px'}}>
                <p style={{fontFamily:'Roboto',fontSize:'14px', color:'#6e6e6e', fontWeight:400}}>{channelName}</p>
                <p style={{fontFamily:'Roboto',fontSize:'14px', color:'#6e6e6e', fontWeight:400}}>{views} <span style={{fontSize:15}}>&middot;</span> {lastUploaded}</p>
            </div>
        </div>
    </div>
)