import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Login from './views/Login/Login.js';
import Home from './views/Home/Home.js';
import Dashboard from './views/Dashboard/Dashboard.js';
import Wallet from './views/Wallet/Wallet.js';
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
    const ls = window.localStorage.getItem(LS_KEY);
    let auth = false;
    if (ls && ls != "{\"error\":\"Signature verification failed\"}") {
      auth = JSON.parse(ls);
    }
    this.setState({
      auth
    });
  }

  handleLoggedIn = (auth) => {
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

      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              {auth ? (
                <Home auth={auth} onLoggedOut={this.handleLoggedOut} />
              ) : (
                <Login onLoggedIn={this.handleLoggedIn} />
              )}
            </div>
          </Route>
          <Route exact path="/wallet">
            <div>
              {auth ? (
                <Wallet auth={auth} onLoggedOut={this.handleLoggedOut} />
              ) : (
                <Login onLoggedIn={this.handleLoggedIn} />
              )}
            </div>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    );
  }
}
