import React from 'react'
import Skeleton from 'react-skeleton-loader'

export default () => (
    <div className="userInteraction">
    
        <p><Skeleton /></p>

        <div>
            <p><Skeleton widthRadomness={0}/></p>
        </div>
    
    </div>
)