import React from 'react'
import { Icon } from '../../Common'

export default ({
        views,
        saveVideo,
        iconColorRed, 
        iconColorBlue, 
        onMouseEnterRed, 
        onMouseLeaveRed, 
        onMouseEnterBlue, 
        onMouseLeaveBlue,
        isLiked,
        isFavorited,
        removeVideo
    }) => (
    <div className="userInteraction">
    
        <p style={{fontFamily:'Roboto',fontSize:'16px',color:'#b1b1b1',fontWeight:'300'}}>{views}</p>

        <div className="likes_and_shares">

            {
                isLiked
                ? <div onClick={() => removeVideo('removeLikes', 'isLiked', "Removed From Likes")} style={{cursor:'pointer'}} onMouseLeave={onMouseLeaveBlue} onMouseEnter={onMouseEnterBlue}>
                    <Icon iconName={"fas fa-thumbs-up"} styles={{color:'dodgerblue', transition:'0.4s'}}/>
                    <span className={'likes_and_favs_style'} style={{color:iconColorBlue, color:'dodgerblue', transition:'0.4s'}}>Added To Likes</span>
                </div>
                : <div onClick={() => saveVideo('saveLikes', 'isLiked', 'Saved To Likes')} style={{cursor:'pointer'}} onMouseLeave={onMouseLeaveBlue} onMouseEnter={onMouseEnterBlue}>
                    <Icon iconName={"fas fa-thumbs-up"} styles={{color:iconColorBlue, transition:'0.4s'}}/>
                    <span className={'likes_and_favs_style'} style={{color:iconColorBlue, fontSize:'14px', transition:'0.4s'}}>Add To Likes</span>
                </div>
            }
        

          
            {
                isFavorited
                ? <div onClick={() => removeVideo('removeFavs', 'isFavorited', "Removed From Favorites")} style={{cursor:'pointer'}} onMouseLeave={onMouseLeaveRed} onMouseEnter={onMouseEnterRed}>
                    <Icon iconName={"fas fa-heart"} styles={{color: 'red', transition:'0.4s'}}/>
                    <span className={"likes_and_favs_style"} style={{color:'red', transition:'0.4s'}}>Added to Favorites</span>
                  </div>
                : <div onClick={() => saveVideo('saveFavorites', 'isFavorited', "Saved To Favorites")} style={{cursor:'pointer'}} onMouseLeave={onMouseLeaveRed} onMouseEnter={onMouseEnterRed}>
                    <Icon iconName={"fas fa-heart"} styles={{color: iconColorRed, transition:'0.4s'}}/>
                    <span className={"likes_and_favs_style"} style={{color:iconColorRed, transition:'0.4s'}}>Add to Favorites</span>
                  </div>
            }


        </div>
    
    </div>
)