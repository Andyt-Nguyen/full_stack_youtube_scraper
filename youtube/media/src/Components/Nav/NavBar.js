import React from 'react'
import logo from './images/youtubelogo.png'
import { Icon } from '../Common'

export default () => (
    <div style={{margin:'0 auto', boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1)"}}>
        <nav className="navStyle">
            <div style={{display:'flex', alignItems: 'center'}}>
                <i style={{marginRight: '10px'}} className="fas fa-bars"></i>
                <img src={logo} />
            </div>

            <div style={{display:'flex', justifyContent:"space-evenly", alignItems:'center', width:'230px'}}>
                <Icon iconName={"fas fa-search"}/>
                <Icon iconName={"fas fa-upload"}/>
                <Icon iconName={"fas fa-share"} />
                <Icon iconName={"fas fa-bell"} />
                <Icon iconName= {"fas fa-user-circle"} />
            </div>
        </nav>
    </div>
    
)