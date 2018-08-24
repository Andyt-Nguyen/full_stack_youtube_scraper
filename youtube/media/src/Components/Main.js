import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import MainVideoPage from './Main_Video/MainVideoPage'
import LoginPage from './LoginPage/LoginPage'
import UserPage from './UserPage/UserPage'

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route exact path="/watch_vod/:videoId" component={ MainVideoPage } />
                <Route exact path="/authenticate" component={ LoginPage } />
                <Route exact path="/user/:id" component={ UserPage } />
            </Switch>
        )
    }
}