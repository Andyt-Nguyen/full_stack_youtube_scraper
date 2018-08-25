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

export default ({subCount,thumbnail,username, publisedAt, desc}) => (
    <div className="userInfoContainer">

        <div className="avatar_subscribe">
            
            <div style={{display:'flex', width: '230px', justifyContent:'space-between'}}>
                <div>
                    <Avatar image={thumbnail}/>
                </div>



                <div>
                    <h1 style={{fontWeigth:400,fontSize:'13px', color:'#000'}}>{username}</h1>
                    <p style={{fontWeight:300, fontSize:'13px', color:'#707070'}}>{publisedAt}</p>
                </div>
            </div>



            <div>
                <button style={styles.subscribeBtn}>Subscribe <span style={{color:'#ffd9d9', fontSize:15}}>{subCount}</span></button>
            </div>

        </div>

        <Descript desc={desc}/>
    </div>
)

