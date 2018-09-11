import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import logo from './images/icecreamYouCrube.png'
import PopModule from './SubComponents/PopModule'
import { Icon } from '../Common'
import './styles/index.css'
import placeholderAvatar from './images/kitty.png'


const styles = {
    button: {
      background:'white',
      border: 'none',
      color: 'dodgerblue',
      textTransform: 'uppercase',
      padding: '0 10px',
      fontFamily: 'Roboto',
    }
  }


class NavBar extends Component {
    state = {
        username: '',
        isSignedIn: false,
        showMenu: false,
        avatar_url: '',
        searchQuery:''
    }

    getUserName() {
        try {
            const { username } = JSON.parse(localStorage.getItem('auth_token'))
            fetch(`http://localhost:5000/api/users/getUsersInfo/${username}`)
                .then( res => res.json())
                .then(data => {
                    try {
                        const { avatar_image:avatar_url } = data[0]
                        this.setState({username, avatar_url: avatar_url == null || avatar_url == undefined ? placeholderAvatar : avatar_url, isSignedIn:true})
                    } catch(e) {
                        this.setState({username, avatar_url:placeholderAvatar, isSignedIn:true})
                    }
                    
                })
            
        } catch(e) {
            console.log('user not signed in')
        }  
    }

    logoutUser() {
        window.localStorage.clear()
        this.props.history.push('/')
        window.location.reload()
    }

    handleSearch(e) {
        e.preventDefault()
        this.props.history.push(`/search/${this.state.searchQuery}`)
        
    }

    componentDidMount() {
        this.getUserName()
    }

    render() {
        return (
            <div>
                <div style={{boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1)"}}>
                    <nav className="navStyle">
                        <div style={{display:'flex', alignItems: 'center'}}>
                            <Link to="/"><img src={logo} style={{marginLeft:10,width:150}} /></Link>
                        </div>

                        <form onSubmit={this.handleSearch.bind(this)} className="nav_input_wrapper">
                            <div className="nav_input_container">
                                <input onChange={e => this.setState({searchQuery:e.target.value}) } className="nav_input" type="text" />
                                <button className="nav_search_btn"><Icon iconName={"fas fa-search"} /></button>
                            </div>
                        </form>
                  


        
                        <div className="nav_icon_container">
                            <Icon styles={{cursor:'not-allowed'}} iconName={"fas fa-upload"} />
                            <Icon styles={{cursor:'not-allowed'}} iconName={"fas fa-share"} />
                            <Icon styles={{cursor:'not-allowed'}} iconName={"fas fa-bell"} />
                            

                            {
                                this.state.isSignedIn
                                ? <Button onClick={() => this.setState({showMenu:!this.state.showMenu})} size="medium" color="primary" className={this.props.classes.button}>
                                    {this.state.username}
                                  </Button>

                                :<Link to="/signin" style={{textDecoration:'none'}}> 
                                    <Button size="small" color="primary" className={this.props.classes.button}>
                                        <h4>Sign In</h4>
                                    </Button>
                                 </Link>
                                
                            }                            
                        </div>



                    </nav>
                </div>
                {
                    this.state.showMenu
                    ? <PopModule 
                        username={this.state.username} 
                        logout={this.logoutUser.bind(this)} 
                        avatar_url={this.state.avatar_url}/>
                    : ''
                }
            </div>
        )
    }
}  

const styledNav = withStyles(styles)(NavBar)
export default withRouter(styledNav)