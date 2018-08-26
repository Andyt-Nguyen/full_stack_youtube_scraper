import React from 'react'
import Skeleton from 'react-skeleton-loader'
import Thumbnail from './Thumbnail';

const styles = {
    displayFlex: {
        display: 'flex',
        marginTop: 5
    }
}
export default ({displayFlex}) => (
    <div style={{ display: displayFlex ? 'flex' : '', marginTop: displayFlex ? 10 : ''}}>
        <div style={{width:'215px', height:'118px'}}> 
            <Skeleton widthRandomness={0} width="90%"/>
        </div>
        <div style={{width:'200px'}}>
            <p style={{height:10}}><Skeleton color="#ccc"/></p>
            <p style={{height:9, marginTop:5}}><Skeleton color="#ccc" /></p>
            <br/>
            {
                displayFlex
                ? <React.Fragment>
                    <p style={{height:9, marginTop:5}}><Skeleton color="#ccc" /></p>
                    <p style={{height:9, marginTop:5}}><Skeleton color="#ccc"/></p>
                  </React.Fragment>
                : ''
            }
            
        </div>
    </div>
)
