import React from 'react'
import { Icon } from '../../Common'

export default ({categoryName}) => (
    <div className="category_title">
        <h4 style={{fontFamily:'Roboto', fontWeight:'bold', fontSize:'16px'}}>{categoryName}</h4>
        <Icon styles={{color:'#9d9d9d', fontSize:25}} iconName="fas fa-times"/>
    </div>
)