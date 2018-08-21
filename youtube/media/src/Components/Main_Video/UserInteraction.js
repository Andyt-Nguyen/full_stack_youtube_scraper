import React from 'react'
import { Icon } from '../Common'


export default () => (
    <div className="userInteraction">
    
        <p style={{fontSize:'18px',color:'#b1b1b1',fontWeight:'300'}}>344k views</p>

        <div className="likes_and_shares">
            <div>
                <Icon iconName={"fas fa-thumbs-up"} />
                <span style={{marginLeft:'5px', color:'#b1b1b1', fontSize:'15px'}}>10.5k</span>
            </div>

            <div>
                <Icon iconName={"fas fa-thumbs-down"} />
                <span style={{marginLeft:'5px', color:'#b1b1b1', fontSize:'15px'}}>143</span>
            </div>

            <div>
                <Icon iconName={"fas fa-share"} />
                <span style={{marginLeft:'5px', color:'#b1b1b1', fontSize:'15px'}}>Share</span>
            </div>


            <Icon iconName={"fas fa-outdent"} />
            <Icon iconName={"fas fa-ellipsis-h"} />
        </div>
    
    </div>
)