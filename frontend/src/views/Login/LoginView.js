import './Login.css';
import React from 'react';
import logo from '../../assets/img/logo.svg';

export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (    
          <div className="Login">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to MicroGrid Login</h1>
            </header>
            <p>
              Please select your login method.
              <br />
              For the purpose of this demo, only MetaMask login is implemented.
            </p>
            <button className="Login-button Login-mm" onClick={this.props.handleClick}>
              {this.props.loading ? 'Loading...' : 'Login with MetaMask'}
            </button>
          </div>
        );
      }
}