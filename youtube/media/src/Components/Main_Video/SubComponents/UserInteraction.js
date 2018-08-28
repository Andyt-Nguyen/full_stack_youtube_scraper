import React from 'react'
import { Icon } from '../../Common'

export default ({
        views,
        saveToFavorites,
        saveToLikes, 
        iconColorRed, 
        iconColorBlue, 
        onMouseEnterRed, 
        onMouseLeaveRed, 
        onMouseEnterBlue, 
        onMouseLeaveBlue
    }) => (
    <div className="userInteraction">
    
        <p style={{fontFamily:'Roboto',fontSize:'16px',color:'#b1b1b1',fontWeight:'300'}}>{views}</p>

        <div className="likes_and_shares">

            <div onClick={() => saveToLikes()} style={{cursor:'pointer'}} onMouseLeave={onMouseLeaveBlue} onMouseEnter={onMouseEnterBlue}>
                <Icon iconName={"fas fa-thumbs-up"} styles={{color:iconColorBlue, transition:'0.4s'}}/>
                <span className={'likes_and_favs_style'} style={{color:iconColorBlue, transition:'0.4s'}}>Add To Likes</span>
            </div>

          

            <div onClick={() => saveToFavorites()} style={{cursor:'pointer'}} onMouseLeave={onMouseLeaveRed} onMouseEnter={onMouseEnterRed}>
                <Icon iconName={"fas fa-heart"} styles={{color: iconColorRed, transition:'0.4s'}}/>
                <span className={"likes_and_favs_style"} style={{color:iconColorRed, transition:'0.4s'}}>Add to Favorites</span>
            </div>


        </div>
    
    </div>
)