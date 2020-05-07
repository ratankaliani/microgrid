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
            buyPrice: 0,
            seller: null,
            txPrice: 0,
            txEnergyAmount: 0,
            txPPS: 0,
            tx: null

        };
        this.findMatch = this.findMatch.bind(this);
        this.acceptTransaction = this.acceptTransaction.bind(this);
        this.createListing = this.createListing.bind(this);
    }
    createListing = (user) => {
        if (user != {} && user != null) {
            console.log("Create Listing");
            console.log(user)
            const response = fetch(REACT_APP_BACKEND_URL+"/transaction/add", {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "energyAmount": 10,
                    "pricePerShare": user.sellPrice,
                    "seller": user.publicAddress
                }),
                method: 'POST'
            })
            .then(response => response.json())
            .then(updatedTx => {
                console.log(updatedTx);
            })
        }
    }
    acceptTransaction = (minTransaction) => {
        if (minTransaction != {} && minTransaction != null) {
            console.log("Update Transaction");
            console.log(minTransaction)
            const response = fetch(REACT_APP_BACKEND_URL+"/transaction/update", {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": minTransaction._id,
                    "buyer": this.state.user.publicAddress,
                    "accepted": true
                }),
                method: 'POST'
            })
            .then(response => response.json())
            .then(updatedTx => {
                console.log(updatedTx);
            })
        }
    }

    findMatch = () => {
        console.log("Got to Find Match")
        const response = fetch(REACT_APP_BACKEND_URL+"/transaction/findMin", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        
        .then(response => {
            response.json()
        })
        .then(tx => {
            console.log(tx);
            //Handles if the buyPrice is less than or equal to the PPS
            if (tx != null && tx.pricePerShare <= this.state.user.buyPrice) {
                this.setState({
                    txPPS: tx.pricePerShare,
                    seller: tx.seller,
                    txEnergyAmount: tx.energyAmount,
                    txPrice: tx.totalPrice,
                    tx: tx
                });
            }
            else {
                
                this.setState({
                    txPPS: 0,
                    seller: "No Seller Found.",
                    txEnergyAmount: 0,
                    txPrice: 0,
                    tx: null
                });
            }
            
        }).then(
            // console.log(this.state)
        );

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
            },
            method: 'GET'
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
        }));



        
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
        console.log(this.findMatch);
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
                txPPS={this.state.txPPS}
                seller={this.state.seller}
                txEnergyAmount ={this.state.txEnergyAmount}
                txPrice = {this.state.txPrice}
                user = {this.state.user}
                tx = {this.state.tx}
                acceptTransaction = {this.acceptTransaction}
                findMatch = {this.findMatch}
                createListing = {this.createListing}
                
            />
            
        );
       
    }
}