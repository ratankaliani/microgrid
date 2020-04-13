import './Home.css';
import jwtDecode from 'jwt-decode';
import React from 'react';
import HomeView from "./HomeView.js"
import {REACT_APP_BACKEND_URL} from "../../assets/constants.js";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: undefined,
            username: ""
        };
    }

    componentDidMount() {
        const {
            auth: { accessToken }
        } = this.props;
        const {
            payload: { id }
        } = jwtDecode(accessToken);

        fetch(REACT_APP_BACKEND_URL+"/users/"+id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(user => this.setState({ user }))
        .catch(window.alert);
    }

    handleChange = ({target: { value }}) => {
        this.setState({ username: value });
    };

    handleSubmit = () => {
        const {
            auth: { accessToken }
        } = this.props;
        const { user, username } = this.state;

        this.setState({ loading: true });
        if (!user) {
            window.alert(
                'The user id has not been fetched yet. Please try again in 5 seconds.'
            );
            return;
        }

        fetch(REACT_APP_BACKEND_URL+"/users/"+user._id, {
            body: JSON.stringify({ username }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'PATCH'
            })
            .then(response => response.json())
            .then(user => this.setState({ loading: false, user }))
            .catch(err => {
                window.alert(err);
                this.setState({ loading: false });
        });
    };

    render() {
        const {
            auth: { accessToken },
            onLoggedOut
        } = this.props;
        const {
            payload: { publicAddress }
        } = jwtDecode(accessToken);
        const { loading, user } = this.state;

        const username = user && user.username;

        return (
            <HomeView 
                loading={loading}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                onLoggedOut={onLoggedOut}
                publicAddress={publicAddress}
                username={username}
            />
        );
    }
}