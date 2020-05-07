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
            buyPrice: 0
        };
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
            this.setState({
                user: user,
                producer: user.producer,
                sellPrice: user.sellPrice,
                buyPrice: user.buyPrice,
                battery: user.production.battery,
                username: user.username,
                publicAddress: user.publicAddress
            });
            return user.publicAddress;
        })
        .catch(window.alert));

        this.handleContractPurchase(0.1);
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
                battery={this.state.battery}
            />
        );
    }
}