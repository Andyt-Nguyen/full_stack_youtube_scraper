import React from 'react'
import { Avatar } from '../../Common'
import Descript from './SubComponents/Descript'


export default ({subCount,thumbnail,username, publishedAt, desc}) => (
    <div className="userInfoContainer">
        <div className="avatar_subscribe">
            
            <div style={{display:'flex', width: '230px', justifyContent:'space-between'}}>
                <div>
                    <Avatar image={thumbnail}/>
                </div>

                <div>
                    <h1 style={{fontWeigth:400,fontSize:'13px', color:'#000'}}>{username}</h1>
                    <p style={{fontWeight:300, fontSize:'13px', color:'#707070'}}>{publishedAt}</p>
                </div>
            </div>

            <div>
                <button>Subscribe <span style={{color:'#ffd9d9', fontSize:15}}>{subCount}</span></button>
            </div>
        </div>

        <Descript desc={desc}/>
    </div>
)

