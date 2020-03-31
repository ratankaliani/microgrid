import './Login.css';

import React from 'react';
import Web3 from 'web3';
// import { Auth } from '../types';

import {REACT_APP_BACKEND_URL} from "../../assets/constants.js";

// interface Props {
//   onLoggedIn: (auth: Auth) => void;
// }

let web3 = undefined; // Will hold the web3 instance

export default class Login extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          accessToken: ""
        }
    }
  

    handleAuthenticate = async (publicAddress, signature) => {
        let response = await fetch(REACT_APP_BACKEND_URL+"/auth", {
            body: JSON.stringify({ publicAddress, signature }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        let r = await response.json(); 
        console.log(r.accessToken); 
        return r;
    }
    

  handleClick = async () => {

    // Check if MetaMask is installed
    if (!(window).ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await (window).ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3((window).ethereum);
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    this.setState({ loading: true });

    // Look if user with current publicAddress is already present on backend
    fetch(
      REACT_APP_BACKEND_URL+"/users?publicAddress="+publicAddress
    ).then(response => response.json())
      // If yes, retrieve it. If no, create it.
      .then(users =>
        users.length ? users[0] : this.handleSignup(publicAddress)
      )
      // Popup MetaMask confirmation modal to sign message
      .then((user) => this.handleSignMessage(user.publicAddress, user.nonce))
      // Send signature to backend on the /auth route
      .then((snap) => {console.log(snap.publicAddress, snap.signature); let y = this.handleAuthenticate(snap.publicAddress, snap.signature); console.log("post", y); return y;})
      // Pass accessToken back to parent component (to save it in localStorage)
      .then((token) => {console.log(token); this.props.onLoggedIn(token);})
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
  };

  handleSignMessage = async (publicAddress, nonce) => {
    try {
      console.log(publicAddress, "yuh", nonce, `I am signing my one-time nonce: ${nonce}`);
      web3.eth.getCoinbase((err, coinbase) => {console.log(coinbase)});
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        '' // MetaMask will ignore the password argument here
      );
      return { publicAddress, signature };
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  };

  handleSignup = (publicAddress) => {
    return fetch(REACT_APP_BACKEND_URL+"/users", {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <p>
          Please select your login method.
          <br />
          For the purpose of this demo, only MetaMask login is implemented.
        </p>
        <button className="Login-button Login-mm" onClick={this.handleClick}>
          {loading ? 'Loading...' : 'Login with MetaMask'}
        </button>
      </div>
    );
  }
}