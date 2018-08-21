import React, { Component } from 'react';
import NavBar from './Components/Nav/NavBar'
import Main from './Components/Main'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Main />
      </div>
    );
  }
}

