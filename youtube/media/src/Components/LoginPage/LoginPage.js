import React, { Component } from "react";
import ExpiredStorage from 'expired-storage'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import LoginContainer from './SubComponents/LoginContainer'
import SignInfo from './SubComponents/SignInfo'
import blue from '@material-ui/core/colors/blue'
import logo from './styles/images/icecream.png'
import './styles/loginpage.css'

export default class LoginPage extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            usernameMsg: '',
            passwordMsg: '',
            alreadyCreatedUser: false,
            alreadyCreatedPass: false,
            alreadyCreatedUserText: '',
            alreadyCreatedPassText: '',
            isSign: true,
            isLoading: false,
            isUsername: false,
            isPassword: false,
        }
    }


    signUpUser() {
        const { username, password } = this.state
        this.setState({isLoading:true})
        if(username.length < 5) return this.setState({isLoading:false, isUsername:true, usernameMsg: 'You need 5 characters or more to create a username'})
        if(password.length < 5) return this.setState({isLoading:false, isPassword:true, passwordMsg: 'You need 5 characters or more to create a password'})
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        }).then(res => res.json())
          .then(data => {
                const { message } = data
                if(message === 'Username already been created') this.setState({isUsername: true, isLoading:false})
                else this.setState({isUsername: false,usernameMsg:message, isLoading:false})
                if(message === 'User has been successfully added') this.setState({isSign:!this.state.isSign})
          })
          .catch(err => this.setState({isLoading:false, message:'Failed to load'}))
    }

    loginUser(){
        const { username, password } = this.state
        this.setState({isLoading:true})
        fetch('http://localhost:5000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        }).then(res => res.json())
          .then(data => {
              const { message } = data
              if(message === 'User not found') this.setState({alreadyCreatedUserText:message,alreadyCreatedUser: true, isLoading:false})
              else this.setState({alreadyCreatedUser: false, isLoading:false})
              if(message === 'Password Failed') this.setState({alreadyCreatedPassText:"Invalid Password",alreadyCreatedPass: true, isLoading:false})
              else this.setState({alreadyCreatedPass: false, isLoading:false})
              if(message === 'Auth successful') {
                  const expiredStorage = new ExpiredStorage() // stores jwt and a expiration time
                  expiredStorage.setItem('auth_token', JSON.stringify({token:data.token,user_id: data.user_id, username:data.username, avatar_url:data.avatar_url}), 3600)
                  this.props.history.push('/')
              }
            })
          .catch(err => this.setState({isLoading:false, message:'Failed to load'}))
    }

    switchView() {
        this.setState({isSign:!this.state.isSign})
    }


    render() {
        const theme = createMuiTheme({
            palette: {
              primary: blue,
            },
          });

        return (
            <div style={{height:'100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <LoginContainer isLoading={this.state.isLoading}>
                    <SignInfo
                        usernameErrorMsg={this.state.usernameMsg}
                        passwordErrorMsg={this.state.passwordMsg}
                        isUsername={this.state.isUsername}
                        isPassword={this.state.isPassword}
                        labelUsername={"New Username"}
                        labelPassword={"New Password"}
                        isSign={this.state.isSign}
                        switchView={this.switchView.bind(this)} 
                        title={"Create an Account"}
                        logo={logo} 
                        theme={ theme } 
                        cta={this.signUpUser.bind(this)}
                        username={this.state.username}
                        password={this.state.password} 
                        onChangeUsername={ e => this.setState({username:e.target.value})}
                        onChangePassword={ e => this.setState({password:e.target.value})} 
                        animation={this.state.isSign ? 'slide_out' : 'slide_in'} />
                    

                    <SignInfo
                        usernameErrorMsg={this.state.alreadyCreatedUserText}
                        passwordErrorMsg={this.state.alreadyCreatedPassText}
                        isUsername={this.state.alreadyCreatedUser}
                        isPassword={this.state.alreadyCreatedPass}
                        labelUsername={"Enter Username"}
                        labelPassword={"Enter Password"}
                        isSign={this.state.isSign}
                        switchView={this.switchView.bind(this)} 
                        title={"Sign In"}
                        logo={logo} 
                        theme={ theme } 
                        cta={this.loginUser.bind(this)}
                        username={this.state.username}
                        password={this.state.password} 
                        onChangeUsername={ e => this.setState({username:e.target.value})}
                        onChangePassword={ e => this.setState({password:e.target.value})} 
                        animation={this.state.isSign ? 'slide_in' : 'slide_out'}/>
                </LoginContainer>
            </div>
            
        )
    }
}