import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import MainVideoPage from './Main_Video/MainVideoPage'
import LoginPage from './LoginPage/LoginPage'
import UserPage from './UserPage/UserPage'
import SearchPage from './SearchPage/SearchPage'
import NotFound from './NotFound/NotFound'

const findUser = (username) => {
    let found = []
    fetch(`/api/users/getUsersInfo/${username}`)
    .then( res => res.json())
    .then( data => found = data);

    if(found.length < 1) {
        return false
    } else {
        return true
    }
}

const UserRoute = ({component:Component, ...rest}) => (
    <Route {...rest} render={ props => (
            findUser(props.match.params.username)
            ? <Redirect to="/notfound"/>
            : <Component {...props} />
    )} />
)

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route exact path="/watch_vod/:videoId" component={ MainVideoPage } />
                <Route exact path="/signin" component={ LoginPage } />
                <UserRoute exact path="/user/:username" component={ UserPage } />
                <Route exact path="/search/:query" component={ SearchPage } />
                <Route component={ NotFound }/>
            </Switch>
        )
    }
}