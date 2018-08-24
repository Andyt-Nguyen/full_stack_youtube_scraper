import React from 'react'
import { Avatar } from '../../Common'

export default () => (
    <div style={{background:'#fafafa'}}>
        <div className="user_info_subscriber_wrapper">
            <div className="_user_info_container">
                <Avatar className="hide_avatar" styles={{width:80, height:80,marginRight:24}} image="https://placehold.it/100"/>
                <div>
                    <p>Leahbee</p>
                    <p>226,433 subscribers</p>
                </div>
            </div>

            <div className="_sub_container">
                <button className="subscriber_btn">SUBSCRIBE <span style={{color:'#ffc8c8'}}>226k</span></button>
            </div>
        </div>
    </div>
)