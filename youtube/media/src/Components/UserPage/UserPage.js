import React, { Component } from 'react'
import './styles/index.css'
import placeholderLogo from './styles/placeholder.jpg'
import Tabs from './SubComponents/Tabs';
import UserInfoSub from './SubComponents/UserInfoSub'
import NavBar from '../Nav/NavBar'


export default class UserPage extends Component {
    render() {
        return(
            <div>
                <NavBar />
                <div className="obj-wrapper"><div className="content"/></div>
                <UserInfoSub username={this.props.match.params.username} />
                <Tabs />
            </div>
        )
    }
}
