import React from 'react'

export default ({img}) => (
    <div className="thumbnail"
        style={{
            backgroundImage:`url('${img}')`, 
            backgroundPosition:'center',
            backgroundSize:'cover'}} />
)