import React from 'react'

export default ({image}) => (
    <div style={{width:"60px", height:"60px",borderRadius:'50%', backgroundImage:`url(${image})`, backgroundPosition:'center center', backgroundSize:'cover'}}></div>
)