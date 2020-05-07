import './Wallet.css';
import jwtDecode from 'jwt-decode';
import React from 'react';
import WalletView from "./WalletView.js"
import {REACT_APP_BACKEND_URL} from "../../assets/constants.js";

import Web3 from "web3";
import {discountContractABI, discountContractAddress} from "../../assets/constants.js";
const web3 = new Web3(window.web3.currentProvider);
const getProvider = async () => {
    await window.web3.currentProvider.enable();
}
getProvider();
const discountContract = new web3.eth.Contract(discountContractABI, discountContractAddress);

export default class Wallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false,
            username: "",
            sellPrice: 0,
            buyPrice: 0,
            seller: "No match found.",
            txPrice: 0,
            txEnergyAmount: 0,
            txPPS: 0,
            tx: null,
            isMatch: false,
            createListingMessage: "This will create an energy listing that buyers in your network can purchase."

        };
        this.findMatch = this.findMatch.bind(this);
        this.acceptTransaction = this.acceptTransaction;
        this.createListing = this.createListing;
    }
    createListing = (currentUser) => {
        console.log(currentUser);
        if (currentUser != {} && currentUser != null && currentUser != false && currentUser.production.battery >= 5) {
            // console.log("Battery", user.production.battery)
            // console.log("Create Listing");
            // console.log("Current User", user)
            const response = fetch(REACT_APP_BACKEND_URL+"/transaction/add", {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "energyAmount": 5,
                    "pricePerShare": currentUser.sellPrice,
                    "seller": currentUser.publicAddress
                }),
                method: 'POST'
            })
            .then(listing => listing.json())
            .then(updatedTx => {
                // console.log("New Transaction", updatedTx);
                currentUser.production.battery = currentUser.production.battery - 5;
                this.setState({battery: currentUser.production.battery});
                // console.log(user.production.battery)
            }).then(
                response => fetch(REACT_APP_BACKEND_URL+"/users/update", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "publicAddress": currentUser.publicAddress,
                        "production": currentUser.production
                    }),
                    method: 'POST'
                })
                .then(listing => listing.json())
                .then(updatedUser => {
                    // console.log("Updated User", updatedUser);
                    if (this.state.createListingMessage == "Not enough energy in battery.") {
                        this.setState({
                            createListingMessage: "This will create an energy listing that buyers in your network can purchase."
                        })
                    }
                    this.handleContractUpdate();
                })
            )
            
        }
        else if (currentUser != null && currentUser != {}){
            // console.log("Not enough energy!")
            if (this.state.createListingMessage != "Not enough energy in battery.") {
                this.setState({
                    createListingMessage: "Not enough energy in battery."
                })
            }   
        }
        
    }
    acceptTransaction = (minTransaction, user) => {
        // console.log("Opened Function")
        // console.log("tx", minTransaction)
        // console.log("user", user)
        if (minTransaction != {} && minTransaction != null && user != null) {
            // console.log("Update Transaction");
            
            const response = fetch(REACT_APP_BACKEND_URL+"/transaction/update", {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": minTransaction._id,
                    "buyer": user.publicAddress,
                    "accepted": true
                }),
                method: 'POST'
            })
            .then(response => response.json())
            .then(minTx => {
                // console.log("Minimum Transaction", minTx);
                this.handleContractPurchase(minTx.totalPrice)
                user.production.battery = user.production.battery + 0
            }).then(
                response => fetch(REACT_APP_BACKEND_URL+"/users/update", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "publicAddress": user.publicAddress,
                        "production": user.production
                    }),
                    method: 'POST'
                })
                .then(listing => listing.json())
            )
        }
    }

    findMatch = () => {
        // console.log("Got to Find Match")
        const response = fetch(REACT_APP_BACKEND_URL+"/transaction/findMin", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(user =>       
            user.json()
        )
        .then(tx => {
            console.log("TRANSACIONT", tx);
            // console.log("found minimum transactino", tx);
            //Handles if the buyPrice is less than or equal to the PPS
            if (tx != null && tx.pricePerShare <= this.state.buyPrice) {
                this.setState({
                    txPPS: tx.pricePerShare,
                    seller: tx.seller,
                    txEnergyAmount: tx.energyAmount,
                    txPrice: tx.totalPrice,
                    tx: tx,
                    isMatch: true
                });
            }
            else {
                this.setState({
                    txPPS: 0,
                    seller: "No Seller Found.",
                    txEnergyAmount: 0,
                    txPrice: 0,
                    tx: null,
                    isMatch: false
                });
            }
            
        })

    }

    updateSellPrice = (direction) => {
        let newSellPrice = this.state.sellPrice;
        if (direction == "-") {
            newSellPrice = Math.round(100*(this.state.sellPrice - 0.01))/100
        } else {
            newSellPrice = Math.round(100*(this.state.sellPrice + 0.01))/100
        }
        fetch(REACT_APP_BACKEND_URL+"/users/update", {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "publicAddress": this.state.publicAddress,
                "sellPrice": newSellPrice
            }),
            method: 'POST'
        }).then(_ => {
            this.setState({sellPrice: newSellPrice});
        });
    }

    updateBuyPrice = (direction) => {
        let newBuyPrice = this.state.buyPrice;
        if (direction == "-") {
            newBuyPrice = Math.round(100*(this.state.buyPrice - 0.01))/100
        } else {
            newBuyPrice = Math.round(100*(this.state.buyPrice + 0.01))/100
        }
        fetch(REACT_APP_BACKEND_URL+"/users/update", {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "publicAddress": this.state.publicAddress,
                "buyPrice": newBuyPrice
            }),
            method: 'POST'
        }).then(_ => {
            this.setState({buyPrice: newBuyPrice});
        });
    }


    async componentDidMount() {
        const {
            auth: { accessToken }
        } = this.props;
        const {
            payload: { id }
        } = jwtDecode(accessToken);

        let publicAddress = await fetch(REACT_APP_BACKEND_URL+"/users/"+id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: 'GET'
        })
        .then(response => response.json()
        .then(user => {
            // console.log("Changing user", user);
            this.setState({
                user: user,
                producer: user.producer,
                sellPrice: user.sellPrice,
                buyPrice: user.buyPrice,
                battery: user.production.battery,
                username: user.username,
                production: user.production,
                publicAddress: user.publicAddress
            });
            return user.publicAddress;
        })
        .catch(window.alert));

    }

    handleContractPurchase = (price) => {
        let weiPrice = price * 1000000000000000000 //note: transaction must be processed in WEI
        console.log("paying contract!");
        discountContract.methods.purchase().send({
            from: this.state.publicAddress,
            value: weiPrice,
        });
    }

    handleContractUpdate = () => {
        console.log("updating contract!");
        discountContract.methods.updateTotalPrice(100000000000).send({
            from: this.state.publicAddress,
        });
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
        // console.log("Render user", this.state.user);
        return (
            <WalletView 
                loading={loading}
                onLoggedOut={onLoggedOut}
                publicAddress={this.state.publicAddress}
                username={this.state.username}
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
                createListingMessage = {this.state.createListingMessage}
                isMatch={this.state.isMatch}
                battery={this.state.battery}
                updateBuyPrice={this.updateBuyPrice}
            />
            
        );
       
    }
}