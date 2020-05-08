import './Home.css';
import jwtDecode from 'jwt-decode';
import React from 'react';
import HomeView from "./HomeView.js"
import {REACT_APP_BACKEND_URL} from "../../assets/constants.js";

// import Mongo from 'mongodb';
// import mongoose from 'mongoose';
// import User from '../../tempModels/user.js';
// const MongoClient = Mongo.MongoClient;
// const uri = "mongodb+srv://ratankaliani:bL0cK%3Fp4rT%2A@cluster0-iasb3.mongodb.net/Microgrid?retryWrites=true&w=majority?authSource=admin";

// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false,
            username: "",
            publicAddress: "",
            boughtTransactions: [],
            soldTransactions: []
        };
    }

    async componentDidMount() {
        const {auth: { accessToken }} = this.props;
        const {payload: {id}} = jwtDecode(accessToken);

        let publicAddress = await fetch(REACT_APP_BACKEND_URL+"/users/"+id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'GET'
        })
        .then(response => response.json()
        .then(user => {
            console.log(user);
            this.setState({
                user: user,
                publicAddress: user.publicAddress,
                username: user.username,
                battery: user.production.battery
            });
            return user.publicAddress;
        })
        .catch(window.alert));

        fetch(REACT_APP_BACKEND_URL+"/transaction/findAll", {
            body: JSON.stringify({buyer: publicAddress}),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json())
        .then(transactions => {
            let temp = [];
            transactions.forEach(transaction => {
                if (transaction.accepted) {
                    temp.push(transaction);
                }
            });
            this.setState({
                boughtTransactions: temp.reverse()
            });
        })
        .catch(window.alert);

        fetch(REACT_APP_BACKEND_URL+"/transaction/findAll", {
            body: JSON.stringify({seller: publicAddress}),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json())
        .then(transactions => {
            let temp = [];
            transactions.forEach(transaction => {
                if (transaction.accepted) {
                    temp.push(transaction);
                }
            });
            this.setState({
                soldTransactions: temp.reverse()
            });
        })
        .catch(window.alert);
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
            <HomeView 
                loading={loading}
                onLoggedOut={onLoggedOut}
                publicAddress={this.state.publicAddress}
                username={this.state.username}
                soldTransactions={this.state.soldTransactions}
                boughtTransactions={this.state.boughtTransactions}
                updateSellPrice={this.updateSellPrice}
                battery={this.state.battery}
            />
        );
    }
}