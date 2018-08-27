import React from 'react'
import Skeleton from 'react-skeleton-loader'

export default () => (
    <div style={{marginBottom:'10px', width:250}}>
        <p><Skeleton widthRadomness={0} height={'35px'} width={'100%'}/></p>
    </div>
)