import './Home.css';
import React from 'react';
import logo from '../../assets/img/logo.png';
import Blockies from 'react-blockies';

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">you logged in boi</h1>
                </header>
                <p>
                    Logged in as <Blockies seed={this.props.publicAddress} />
                </p>
                <div>
                    My username is {this.props.username ? <pre>{this.props.username}</pre> : 'not set.'} My
                    publicAddress is <pre>{this.props.publicAddress}</pre>
                </div>
                <div>
                    <label htmlFor="username">Change username: </label>
                    <input name="username" onChange={this.props.handleChange} />
                    <button disabled={this.props.loading} onClick={this.props.handleSubmit}>
                        Submit
                    </button>
                </div>
                <p>
                    <button onClick={this.props.onLoggedOut}>Logout</button>
                </p>
            </div>
        );
      }
}