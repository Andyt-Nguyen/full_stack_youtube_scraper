import React from 'react'
import Switch from '@material-ui/core/Switch';

export default () => (
    <div className="upnext_container">
        <p style={{fontFamily:'Roboto', fontSize: 15}}>Up next</p>

        <div style={{display:'flex', alignItems:'center'}}>
            <span style={{textTransform:'uppercase', color:'#888888', fontSize:15}}>Autoplay</span>
            <Switch />
        </div>
    </div>
)