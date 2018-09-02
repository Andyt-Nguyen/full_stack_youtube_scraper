import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import FileDrop from 'react-file-drop'

const styles = {
    button: {
        background: 'dodgerblue',
        color: 'white',
        marginLeft:20,
        borderRadius: 0
    },

    cancelBtn: {
        background: '#ddd',
        color: 'darkgrey',
        marginLeft:20,
        borderRadius: 0
    }
}

const UserForm = (props) => (
    <div className="card_modal">
        <div className="art_header">
            <h3 style={{paddingBottom:20}}>Channel Art</h3>
            <p style={{borderBottom:'3px solid dodgerblue', width:150}}>Upload your photo</p>
        </div>

        <hr style={{marginTop:'30px'}}/>
                        

        <div id="file_drop_container">
            <button
                onClick={props.removeCurrentPic} 
                style={{
                fontSize:20, 
                cursor:'pointer',paddingBottom:5,height:30, 
                width:30,borderRadius:"50%",border:'none', 
                color:'white',background:'#ccc',
                position:'absolute',
                right:0,
                top:0
                }}>x</button>
            {

            props.currentPic !== ''
                ?<div 
                    style={{
                    width: '100%',
                    height: '100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage:`url('${props.currentPic}')`}}/>

                : <FileDrop onDrop={props.handleDrop}>
                    Drop photo here!
                  </FileDrop>
            }

        </div>

        <div style={{marginTop:40}}>
            <hr/>
            <Button onClick={() => props.submitBgPicture()} type="submit" className={props.classes.button}>
                Submit
            </Button>

            <Button type="submit" onClick={props.openBgModal} className={props.classes.cancelBtn}>
                Cancel
            </Button>
        </div>
    </div>
)

export default withStyles(styles)(UserForm)