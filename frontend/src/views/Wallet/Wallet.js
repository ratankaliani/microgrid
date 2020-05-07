import './Wallet.css';
import jwtDecode from 'jwt-decode';
import React from 'react';
import WalletView from "./WalletView.js"
import {REACT_APP_BACKEND_URL} from "../../assets/constants.js";

// import Mongo from 'mongodb';
// import mongoose from 'mongoose';
// import User from '../../tempModels/user.js';
// const MongoClient = Mongo.MongoClient;
// const uri = "mongodb+srv://ratankaliani:bL0cK%3Fp4rT%2A@cluster0-iasb3.mongodb.net/Microgrid?retryWrites=true&w=majority?authSource=admin";

// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

export default class Wallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false,
            username: "",
            sellPrice: 0,
            buyPrice: 0
        };
    }

    componentDidMount() {
        const {
            auth: { accessToken }
        } = this.props;
        const {
            payload: { id }
        } = jwtDecode(accessToken);

        fetch(REACT_APP_BACKEND_URL+"/users?"+id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: {

            }, 
            method: 'POST'
        })
        .then(response => response.json()
        .then(user => {
            console.log(user);
            this.setState({
                user: user,
                producer: user.producer,
                sellPrice: user.sellPrice,
                buyPrice: user.buyPrice
            });
        })
        .catch(window.alert));
    }

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
            <WalletView 
                loading={loading}
                onLoggedOut={onLoggedOut}
                publicAddress={publicAddress}
                username={username}
                updateSellPrice={this.updateSellPrice}
                sellPrice={this.state.sellPrice}
                buyPrice={this.state.buyPrice}
                producer={this.state.producer}
            />
        );
    }
}