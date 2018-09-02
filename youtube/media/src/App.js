import React, { Component } from 'react';
import ExpiredStorage from 'expired-storage'
import Main from './Components/Main'

export default class App extends Component {
  componentDidMount() {
    const expiredStorage = new ExpiredStorage()
    const timeLeft = expiredStorage.getTimeLeft("auth_token")
    if(timeLeft <= 0) {
      localStorage.clear()
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

