import React from 'react'
import { Avatar } from '../../Common'
import Descript from './SubComponents/Descript'

const styles = {
    subscribeBtn: {
        fontFamily:'Roboto',
        background:'#ff0000',
        fontWeight:300,
        color:'white',
        padding:'10px 20px',
        border:'none',
        borderRadius:'2px',
        fontSize:'15px',
        textTransform:'uppercase'
    }
}

export default () => (
    <div className="userInfoContainer">

        <div className="avatar_subscribe">
            
            <div style={{display:'flex', width: '230px', justifyContent:'space-between'}}>
                <div>
                    <Avatar image={"https://ih0.redbubble.net/image.506735559.4560/flat,1000x1000,075,f.u1.jpg"}/>
                </div>



                <div>
                    <h1 style={{fontWeigth:400,fontSize:'13px', color:'#000'}}>UserName</h1>
                    <p style={{fontWeight:300, fontSize:'13px', color:'#707070'}}>Published on July 5th, 2018</p>
                </div>
            </div>



            <div>
                <button style={styles.subscribeBtn}>Subscribe <span style={{color:'#ffd9d9', fontSize:15}}>40k</span></button>
            </div>

        </div>

        <Descript />
    </div>
)

