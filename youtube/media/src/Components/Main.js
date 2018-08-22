import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import MainVideoPage from './Main_Video/MainVideoPage'

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route exact path="/watch_vod/:videoId" component={ MainVideoPage } />
            </Switch>
        )
    }
}