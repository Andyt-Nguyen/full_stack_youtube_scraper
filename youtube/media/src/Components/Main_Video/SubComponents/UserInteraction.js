import React from 'react'
import { Icon } from '../../Common'


export default ({views}) => (
    <div className="userInteraction">
    
        <p style={{fontFamily:'Roboto',fontSize:'16px',color:'#b1b1b1',fontWeight:'300'}}>{views}</p>

        <div className="likes_and_shares">
            <div>
                <Icon iconName={"fas fa-thumbs-up"} />
                <span style={{fontFamily:'Roboto',marginLeft:'5px', color:'#b1b1b1', fontSize:'15px'}}>10.5k</span>
            </div>

            <div>
                <Icon iconName={"fas fa-thumbs-down"} />
                <span style={{fontFamily:'Roboto',marginLeft:'5px', color:'#b1b1b1', fontSize:'15px'}}>143</span>
            </div>

            <div>
                <Icon iconName={"fas fa-share"} />
                <span style={{fontFamily:'Roboto',marginLeft:'5px', color:'#b1b1b1', fontSize:'15px'}}>Share</span>
            </div>


            <Icon iconName={"fas fa-outdent"} />
            <Icon iconName={"fas fa-ellipsis-h"} />
        </div>
    
    </div>
)