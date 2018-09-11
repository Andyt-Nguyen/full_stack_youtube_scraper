import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router-dom'
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
import placeholderAvatar from './styles/kitty.png'

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
        avatarImage: '',
        loadingPreviewImage: false,
        openMessage: false

    }


    getUsersInfo() {
        try {
            fetch(`/api/users/getUsersInfo/${this.props.match.params.username}`)
            .then( res => {
                if(res.status == 200) {
                    return res.json()
                } else {
                     this.props.history.push("/notfound")
                }}
            )
            .then( data => {
                if(data.length < 1) {
                    return this.props.history.push("/notfound")
                }
                try {
                    const { bg_image, avatar_image } = data[0]
                    this.setState({
                        bgImage:bg_image == undefined || bg_image == null ? placeholderImage : bg_image,
                        avatarImage: avatar_image == undefined || avatar_image == null ? placeholderAvatar : avatar_image
                    })
                } catch(e) {
                    return ''
                }
                
            }
        )
        } catch(e) {
            this.setState({
                bgImage: placeholderImage,
                avatarImage: placeholderAvatar
            })
        }
        
    }


    handleDrop = (files, event) => {
        // Add loader
        this.setState({selectedFile:files[0], loadingPreviewImage:true}, () => {
            const picFile = this.state.selectedFile
            if(picFile !== '') {
                let reader = new FileReader(); //Using File Reader API to convert file string
                let url = reader.readAsDataURL(picFile); //Converts file string to DataURL
                reader.onloadend = (e) => { //onloadend checks to see if the image is done downloading
                    this.setState({loadingPreviewImage:false,currentPic:reader.result}) //.result retuns the url string to the image
                }
            }
        })
    }


    submitPicture(e,url, state) {
        e.preventDefault()
        try {
            const {token, user_id} = JSON.parse(localStorage.getItem('auth_token'))
            const { selectedFile } = this.state;
            let formData = new FormData();
            formData.append('bg_images', selectedFile);

            fetch(`/api/users/${url}/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': "Bearer " + token
                },
                body: formData
              }).then(res => res.json())
                .then(data => {
                    this.setState({loadingPreviewImage: true}, () => {
                        this.setState({[state]:this.state.currentPic}, () => this.setState({currentPic:'',openBgModal:false, openAvatarModal:false})) 
                    })
                }).catch(err => {
                    this.setState({openMessage:true}, () => this.setState({currentPic:'',openBgModal:false, openAvatarModal:false})) 
                })             

        } catch(err) {
            this.setState({openMessage:true}, () => this.setState({currentPic:'',openBgModal:false, openAvatarModal:false})) 
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
                            loadingPreviewImage={this.state.loadingPreviewImage}
                            showBgModal={true}
                            handleDrop={this.handleDrop}
                            submitPicture={(e) => this.submitPicture(e, 'upload_bg_img', 'bgImage')}
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
                            submitPicture={(e) => this.submitPicture(e,'upload_avatar_img', 'avatarImage')}
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

                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.openMessage}
                    onClose={() => this.setState({openMessage:false})}
                    autoHideDuration={2000}
                    message={<span id="message-id">File cannot be uploaded at this time</span>} />
            </div>
        )
    }
}

export default withStyles(styles)(UserPage)
