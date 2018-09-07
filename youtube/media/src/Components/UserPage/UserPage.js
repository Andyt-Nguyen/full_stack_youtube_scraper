import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/'
import axios from 'axios'
import './styles/index.css'
import placeholderLogo from './styles/placeholder.jpg'
import Tabs from './SubComponents/Tabs';
import UserInfoSub from './SubComponents/UserInfoSub'
import NavBar from '../Nav/NavBar'
import UploadPreview from 'material-ui-upload/UploadPreview';
import UserForm from './SubComponents/UserForm'
import placeholderImage from './styles/placeholder.jpg'

// Styles to override predefined css styles
const styles = {
    button: {
        background: 'crimson',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
    },

    cancelBtn: {
        background: '#ddd',
        color: 'darkgrey',
        marginLeft:20,
        borderRadius: 0
    }
}

class UserPage extends Component {
    state = {
        selectedFile: '',
        isPreview: false,
        previewImage: '',
        currentPic: '',
        openBgModal: false,
        openAvatarModal: false,
        bgImage: '',
        avatarImage: ''

    }

    getUsersInfo() {
        fetch(`http://localhost:5000/api/users/getUsersInfo/${this.props.match.params.username}`)
            .then( res => res.json() )
            .then( data => {
                this.setState({bgImage:data[0].bg_image, avatarImage: data[0].avatar_image})
            }
        )
    }


    handleDrop = (files, event) => {
        this.setState({selectedFile:files[0]}, () => {
            const picFile = this.state.selectedFile
            if(picFile !== '') {
                let reader = new FileReader(); //Using File Reader API to convert file string
                let url = reader.readAsDataURL(picFile); //Converts file string to DataURL
                reader.onloadend = (e) => { //onloadend checks to see if the image is done downloading
                    this.setState({currentPic:reader.result}) //.result retuns the url string to the image
                }
            }
        })
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


    submitPicture(url) {
        try {
            const {token, user_id} = JSON.parse(localStorage.getItem('auth_token'))
            const { selectedFile } = this.state;
            let formData = new FormData();
            formData.append('bg_images', selectedFile);
            axios.defaults.headers.common['Authorization'] = "Bearer " + token
            axios.put(`http://localhost:5000/api/users/${url}/${user_id}`, formData)

        } catch(err) {
            console.log(err)
        }
    }

    renderUploadBgPicture() {
        try {
            const jwt = JSON.parse(localStorage.getItem('auth_token')).token
            const username = JSON.parse(localStorage.getItem('auth_token')).username
           if(username == this.props.match.params.username) {
               return (
                <React.Fragment>
                <div className="position_btn">
                    <Button onClick={() => this.setState({openBgModal:true})} className={this.props.classes.button}>
                        <AddIcon />
                    </Button>
                </div>
                </React.Fragment>
               )
           } else {
               return ''
           }
        } catch(e) {
            return ''
        }
    }


    renderUserModule() {
        try {
            const username = JSON.parse(localStorage.getItem('auth_token')).username
            if(username == this.props.match.params.username) {
                return (
                    <React.Fragment>
                        {
                        this.state.openBgModal
                        ? <UserForm
                            showBgModal={true}
                            handleDrop={this.handleDrop}
                            submitPicture={() => this.submitPicture('upload_bg_img')}
                            currentPic={this.state.currentPic}
                            openBgModal={() => this.setState({openBgModal:false})}
                            removeCurrentPic={() => this.setState({currentPic:''})} />
    
                         : ''
                    }
                    </React.Fragment>
                    
                )
            } else return ''
        } catch(e) {
            return ''
        }
    }


    renderAvatarModule() {
        try {
            const username = JSON.parse(localStorage.getItem('auth_token')).username
            if(username == this.props.match.params.username) {
                return (
                    <React.Fragment>
                        {
                        this.state.openAvatarModal
                        ? <UserForm
                            showBgModal={false}
                            handleDrop={this.handleDrop}
                            submitPicture={() => this.submitPicture('upload_avatar_img')}
                            currentPic={this.state.currentPic}
                            openBgModal={() => this.setState({openAvatarModal:false})}
                            removeCurrentPic={() => this.setState({currentPic:''})} />
    
                         : ''
                    }
                    </React.Fragment>
                    
                )
            } else return ''
        } catch(e) {
            return ''
        }
       
    }


    componentDidMount() {
        this.getUsersInfo();
    }


    render() {
        console.log(this.state.avatarImage)
        return(
            <div>
                <NavBar />
                <div className="obj-wrapper"><div className="content" style={{backgroundImage:`url('${this.state.bgImage}')`}}/>
                    {this.renderUploadBgPicture()}
                </div>
                {this.renderUserModule()}
                {this.renderAvatarModule()}
                <UserInfoSub 
                    openAvatarModal={() => this.setState({openAvatarModal:true})}
                    username={this.props.match.params.username} 
                    avatarImage={this.state.avatarImage}/>
                <Tabs />
            </div>
        )
    }
}

export default withStyles(styles)(UserPage)
