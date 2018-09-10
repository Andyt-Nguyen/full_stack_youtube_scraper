import React from 'react'
import { Avatar } from '../../Common'

export default ({username, openAvatarModal, avatarImage}) => (
    <div style={{background:'#fafafa'}}>
        <div className="user_info_subscriber_wrapper">
            <div style={{cursor:'pointer'}} onClick={openAvatarModal} className="_user_info_container">
                <Avatar className="hide_avatar" styles={{width:80, height:80,marginRight:24}} image={avatarImage}/>
                <div>
                    <p style={{textTransform:'capitalize'}}>{username}</p>
                    <p>You are the subscriber</p>
                </div>
            </div>

            <div className="_sub_container">
                <button className="subscriber_btn">SUBSCRIBE <span style={{color:'#ffc8c8'}}>:D</span></button>
            </div>
        </div>
    </div>
)