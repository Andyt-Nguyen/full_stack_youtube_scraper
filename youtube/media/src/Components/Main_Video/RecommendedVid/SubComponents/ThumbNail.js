import React from 'react'

const styles = {
    thumbNailStyle: {
    width:'230px', 
    height: '94px',
    backgroundImage:`url('${'https://i.ytimg.com/an_webp/YFANYt52m1g/mqdefault_6s.webp?du=3000&sqp=CKCkyNsF&rs=AOn4CLAgVsMSRG22qBZfdwkHaifkVFkstg'}')`, 
    backgroundSize:'cover', 
    backgroundPosition:'center'}
}

export default ({image}) => (
    <div style={styles.thumbNailStyle}></div>
)

