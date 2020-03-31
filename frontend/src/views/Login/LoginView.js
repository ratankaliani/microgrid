import './Login.css';
import React from 'react';
import MicroGrid from '../../assets/img/microgrid.svg';
import logo from "../../assets/img/logo.png";

export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (    
          <div className="login">
            <div className="login-left-outer">
                <div className="login-left-inner">
                    <h1 className="motto">Energy sharing,</h1>
                    <h1 className="motto">made cheap and easy.</h1>
                    <h2 className="tagline">Say hello to efficiency and goodbye to wasted potential.</h2>
                    <button className="login-button" onClick={this.props.handleClick}>
                        <p className="login-button-text">{this.props.loading ? 'LOADING...' : 'LOGIN WITH METAMASK'}</p>
                    </button>
                </div>
            </div>
            <div className="login-right">
                <img src={MicroGrid} alt="microgrid" className="microgrid-img"/>
                <div className="corner-logo-container">
                    <img src={logo} alt="logo" className="corner-logo"/>
                </div>
            </div>
          </div>
        );
      }
}