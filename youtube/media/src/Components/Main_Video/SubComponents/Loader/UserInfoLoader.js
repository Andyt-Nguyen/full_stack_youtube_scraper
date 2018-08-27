import React from 'react'
import Skeleton from 'react-skeleton-loader'

export default () => (
    <div className="userInfoContainer">

        <div className="avatar_subscribe">
            
            <div style={{display:'flex', width: '230px', justifyContent:'space-between'}}>
                <div>
                    {/* <Avatar image={thumbnail}/> */}
                    <Skeleton borderRadius="50%" width={"60px"} height={"60px"} widthRandomness={0} />
                </div>



                <div>
                    <h1><Skeleton widthRandomness={0} /></h1>
                    <p><Skeleton widthRandomness={0} /></p>
                </div>
            </div>



            <div>
                <Skeleton height={'40px'} width={'200px'} widthRandomness={0} />
            </div>

        </div>

        <div style={{marginLeft:100, marginTop:20}}>
         <Skeleton widthRandomness={0} width={'100%'}/>
         <Skeleton widthRandomness={0} width={'100%'}/>
         <Skeleton widthRandomness={0} width={'100%'}/>
        </div>
    </div>
)