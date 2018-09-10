import React from 'react'
import { Icon } from '../../Common'

export default ({categoryName}) => (
    <div className="category_title">
        <h4 style={{fontFamily:'Roboto', fontWeight:'bold', fontSize:'16px'}}>{categoryName}</h4>
    </div>
)