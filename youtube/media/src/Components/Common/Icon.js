import React from 'react'

export default ({iconName, styles}) => (
    <i style={{fontSize:'18px', color:"#b1b1b1", ...styles}} className={iconName}></i>
)
