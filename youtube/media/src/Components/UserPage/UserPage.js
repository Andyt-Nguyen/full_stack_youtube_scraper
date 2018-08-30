import React, { Component } from 'react'
import axios from 'axios'
import './styles/index.css'
import placeholderLogo from './styles/placeholder.jpg'
import Tabs from './SubComponents/Tabs';
import UserInfoSub from './SubComponents/UserInfoSub'
import NavBar from '../Nav/NavBar'
import UploadPreview from 'material-ui-upload/UploadPreview';

export default class UserPage extends Component {
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

    render() {
        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <input
                type="file"
                name="selectedFile"
                onChange={this.onChange}
                />
                <button type="submit">Submit</button>
            </form>
                <NavBar />
                <div className="obj-wrapper"><div className="content"/></div>
                <UserInfoSub username={this.props.match.params.username} />
                <Tabs />
            </div>
        )
    }
}
