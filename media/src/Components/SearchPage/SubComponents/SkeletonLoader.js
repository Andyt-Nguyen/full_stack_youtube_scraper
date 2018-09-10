import React from 'react'
import Skeleton from 'react-skeleton-loader'

export default () => (
    <div>
        <div style={{display:'flex', marginTop:'10px'}}>

            <div style={{height:"120px", width:"210px"}}>
                <h1><Skeleton widthRandomness={0} height='120px' width="100%" widthRadomness={0} /></h1>
            </div>
            <div style={{marginLeft: 10,width:'65%'}}>
                <p> <Skeleton widthRandomness={0} width="100%" /> </p>
                <p> <Skeleton widthRandomness={0} width="100%" /> </p>
                <p> <Skeleton widthRandomness={0} width="100%" /> </p>
            </div>
        </div>
    </div>
)