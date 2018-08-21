import React from 'react'
import Thumbnail from './Thumbnail';

export default ({title, channelName, lastUploaded, views, img}) => (
    <div>
        <Thumbnail img={img}/>
        <div style={{width:'190px'}}>
            <p style={{fontFamily:'Roboto', paddingTop:'10px', fontSize:'13px', fontWeight:700}}>{title}</p>

            <div style={{marginTop:'10px'}}>
                <p style={{fontFamily:'Roboto',fontSize:'12px', color:'#6e6e6e', fontWeight:400}}>{channelName}</p>
                <p style={{fontFamily:'Roboto',fontSize:'12px', color:'#6e6e6e', fontWeight:400}}>{views} <span style={{fontSize:15}}>&middot;</span> {lastUploaded}</p>
            </div>
        </div>
    </div>
)