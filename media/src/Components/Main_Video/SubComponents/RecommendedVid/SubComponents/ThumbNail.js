import React from 'react'

const styles = {
    thumbNailStyle: {
    width:'168px', 
    height: '94px',
    backgroundSize:'cover', 
    backgroundPosition:'center'}
}

export default ({img}) => (
    <div style={{...styles.thumbNailStyle, backgroundImage:`url('${img}')`}}></div>
)

