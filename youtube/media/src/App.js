import React, { Component } from 'react';
import ExpiredStorage from 'expired-storage'
import Main from './Components/Main'

export default class App extends Component {
  componentDidMount() {
    const expiredStorage = new ExpiredStorage()
    const timeLeft = expiredStorage.getTimeLeft("auth_token")
    console.log(timeLeft)
    if(timeLeft <= 0) {
      expiredStorage.clearExpired()
    }
  }
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

