import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';

const styles = {
    button: {
        background: 'crimson',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px'
    }
}

const UserForm = (props) => (
    <form className="user_bg_form" onSubmit={props.onSubmitBgPic}>
        {/* <input
        className="bg_input"
        type="file"
        name="selectedFile"
        onChange={this.onChange}
        /> */}

        <div>
            <Button type="submit" className={props.classes.button}>
                <AddIcon />
            </Button>
        </div>
    </form>
)

export default withStyles(styles)(UserForm)