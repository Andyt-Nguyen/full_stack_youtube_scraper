import React from 'react'
import Skeleton from 'react-skeleton-loader'

export default () => (
    <div className="video-container">
        <div style={{width:"853px", height:"480px"}}>
            <Skeleton widthRandomness={0} width={'100%'} height={'100%'} />
        </div>
    </div>
)