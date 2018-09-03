import React from 'react'

export default ({img}) => (
    <div 
        className="thumbnailer"
        style={{
            backgroundImage:`url('${img}')`, 
            backgroundPosition:'center',
            backgroundSize:'cover'}} />
)