import React from 'react'

export default ({img}) => (
    <div 
        style={{
            backgroundImage:`url('${img}')`, 
            width:'210px', 
            height:'118px',
            backgroundPosition:'center',
            backgroundSize:'cover'}} />
)