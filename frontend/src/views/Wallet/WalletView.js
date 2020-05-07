import './Wallet.css';
import '../../assets/css/App.css';
import React from 'react';
import logo from '../../assets/img/logo.png';
import SidebarView from '../Sidebar/SidebarView.js';
import Blockies from 'react-blockies';

export default class WalletView extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props)
    }

    render() {
        // console.log("Render user", this.props.user);
        return (
            
            <div>
                <SidebarView 
                    username={this.props.username}
                    selected="wallet"
                />
                <div className="wallet-container">
                    <div className="wallet-filler">
                    </div>
                    <div className="wallet">
                        <div className="outer-container">
                            <div className="page-header">
                                <p className="wallet-title">Wallet</p>
                                <div className="battery-card">
                                    <div className="battery">
                                        <div className="battery-fill" style={{flex: this.props.battery}}>
                                        </div>
                                        <div className="battery-empty" style={{flex: 100 - this.props.battery}}>
                                        </div>
                                    </div>
                                    <p className="battery-text">Battery: {Math.round((this.props.battery / 100) * 100)}%</p>
                                    <p className="battery-text">Energy: {this.props.battery} kWh</p>
                                </div>
                            </div>
                            <div className="container">
                                <div className="primary-col">
                                    <p className="wallet-subtitle">For Buyers</p>
                                    <div className="buy-price-toggle">
                                        <p className="toggle-title">BUY PRICE</p>
                                        <div className="toggle-display">
                                            <form onSubmit={this.props.updateBuyPrice}>
                                                <label className="toggle-input" value={this.props.buyPrice} htmlFor="buy">{this.props.buyPrice} ETH</label>
                                                <input className="toggle-input" id="buy" name="buy" type="text"></input>
                                                <button className="adjust-button">
                                                    <p className="adjust-sell-button-text">ADJUST</p>
                                                </button>
                                            </form>
                                        </div>
                                        <p className="toggle-info">This is your minimum price per share (1 kWh). You will only buy energy shares at this price or below.</p>
                                    </div>
                                </div>
                                <div className="primary-col">
                                    <p className="wallet-subtitle">For Sellers</p>
                                    {
                                        this.props.producer ?
                                        <div className="sell-price-toggle">
                                            <p className="toggle-title">SELL PRICE</p>
                                            <div className="toggle-display">
                                                <form>
                                                    <label className="toggle-input" value={this.props.sellPrice} for="buy"> ETH</label>
                                                    <input className="toggle-input" id="buy" name="buy" type="text"></input>
                                                    <button className="adjust-button">
                                                        <p className="adjust-sell-button-text">ADJUST</p>
                                                    </button>
                                                </form>
                                            </div>
                                            <p className="toggle-info">This is your minimum price per share (1 kWh). You will only sell energy shares at this price or above.</p>
                                        </div> :
                                        <div className="sell-price-toggle" style={{opacity: 0.5}}>
                                            <p className="toggle-title">SELL PRICE</p>
                                            <div className="toggle-display">
                                                <p className="toggle-input">N/A</p>
                                                <div className="adjust-button">
                                                    <p className="adjust-sell-button-text">ADJUST</p>
                                                </div>
                                            </div>
                                            <p className="toggle-info">This is your minimum price per share (1 kWh). You will only sell energy shares at this price or above.</p>
                                        </div>
                                    }
                                    <div className="sell-price-toggle" style={{marginTop: 32, height: 300}}>
                                        <p className="toggle-title">MAKE LISTING</p>
                                        <div className="match-box-text-row">
                                            <p className="match-box-text"><b>Shares</b>: 5</p>
                                            <p className="match-box-text"><b>Price</b>: {this.props.sellPrice} ETH</p>
                                        </div>
                                        <p className="toggle-info">{this.props.createListingMessage}</p>
                                        <button className="adjust-button" onClick={this.props.createListing.bind(this, this.props.user)}>
                                            <p className="adjust-sell-button-text">CREATE</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="secondary-col">
                                    <p className="wallet-subtitle">New Purchases</p>
                                    <button className="matches-button"  onClick = {this.props.findMatch} >
                                     
                                        <p className="matches-button-text">
                                        Find Match
                                        </p>
                                       
                                        
                                    </button>
                                    <div className="match-box">
                                        <p className="match-box-vendor">Vendor:</p>
                                        <p className="match-box-vendor-value">{this.props.seller}</p>
                                        <p className="match-box-display">{this.props.txPrice} ETH</p>
                                        <div className="match-box-text-row">
                                            <p className="match-box-text"><b>Shares</b>: {this.props.txEnergyAmount} kWh</p>
                                            <p className="match-box-text"><b>Price</b>: {this.props.txPPS} ETH</p>
                                        </div>
                                        <button className="accept-button" onClick={this.props.acceptTransaction.bind(this, this.props.tx, this.props.user)}>
                                            <p className="accept-button-text">ACCEPT</p>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}