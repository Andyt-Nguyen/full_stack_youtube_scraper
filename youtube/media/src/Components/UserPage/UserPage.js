import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import './styles/index.css'
import placeholderLogo from './styles/placeholder.jpg'
import Tabs from './SubComponents/Tabs';
import UserInfoSub from './SubComponents/UserInfoSub'
import NavBar from '../Nav/NavBar'
import UploadPreview from 'material-ui-upload/UploadPreview';
import UserForm from './SubComponents/UserForm'

const styles = {
    button: {
        background: 'crimson',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px'
    }
}

class UserPage extends Component {
    state = {
        selectedFile: ''

    }
    onChange = (e) => {
        switch (e.target.name) {
          case 'selectedFile':
            this.setState({ selectedFile: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();
        formData.append('bg_images', selectedFile);
        axios.put('http://localhost:5000/api/users/upload_bg_img', formData)
          .then((result) => {
            // access results...
          })
      }


      onSubmitBgPic = (e) => {
        e.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();
        formData.append('bg_images', selectedFile);
        axios.put('http://localhost:5000/api/users/upload_bg_img', formData)
          .then((result) => {
            // access results...
          })
      }

    render() {
        return(
            <div>
            {/* <form className="user_bg_form" onSubmit={this.onSubmit}>
                <input
                className="bg_input"
                type="file"
                name="selectedFile"
                onChange={this.onChange}
                />

                <div style={{border:'2px solid red'}}>
                    <Button type="submit" className={this.props.classes.button}>
                        <AddIcon />
                    </Button>
                </div>
            </form> */}
                <NavBar />
                <div className="obj-wrapper"><div className="content"/>
                    <UserForm 
                        onSubmitBgPic={this.onSubmitBgPic}/>
                </div>

                
                <UserInfoSub username={this.props.match.params.username} />
                <Tabs />
            </div>
        )
    }
}

export default withStyles(styles)(UserPage)