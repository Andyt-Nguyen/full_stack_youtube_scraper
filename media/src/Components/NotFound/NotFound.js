import React from 'react'
import NavBar from '../Nav/NavBar'
import NotFoundImage from './styles/images/notfound.png'

export default () => (
    <div>
        <NavBar />
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
            <div>
                <img src={NotFoundImage}/>
            </div>
        </div>
    </div>
)