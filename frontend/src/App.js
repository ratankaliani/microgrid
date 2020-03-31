import React from 'react';
import logo from './assets/img/logo.svg';
import './assets/css/App.css';

import Login from './views/Login/Login.js';
import Profile from './views/Profile/Profile.js';
// import { Auth } from '../types';

const LS_KEY = 'login-with-metamask:auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: undefined,
    };
  }

  componentDidMount() {
    // Access token is stored in localstorage
    console.log("HIII");
    const ls = window.localStorage.getItem(LS_KEY);
    console.log("HIII 2");
    console.log("LS", ls);
    let auth = false;
    if (ls === undefined) {
      auth = JSON.parse(ls);
    }
    console.log("HIII 3", auth);
    this.setState({
      auth
    });
  }

  handleLoggedIn = (auth) => {
    console.log(auth);
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    this.setState({ auth });
  };

  handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    this.setState({ auth: undefined });
  };

  render() {
    const { auth } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MicroGrid Login</h1>
        </header>
        <div className="App-intro">
          {auth ? (
            <Profile auth={auth} onLoggedOut={this.handleLoggedOut} />
          ) : (
            <Login onLoggedIn={this.handleLoggedIn} />
          )}
        </div>
      </div>
    );
  }
}
