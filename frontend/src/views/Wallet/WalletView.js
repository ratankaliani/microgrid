import './Wallet.css';
import React from 'react';
import logo from '../../assets/img/logo.png';
import SidebarView from '../Sidebar/SidebarView.js';
import Blockies from 'react-blockies';

export default class WalletView extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div>
                <SidebarView />
                <div className="wallet-container">
                    <div className="filler">
                    </div>
                    <div className="wallet">
                        <div className="outer-container">
                            <p className="wallet-title">MicroGrid Wallet</p>
                            
                            <div className="container">
                                <div className="primary-col">
                                    <p className="wallet-subtitle">For Buyers</p>
                                    <div className="buy-price-toggle">
                                        <p className="toggle-title">BUY PRICE</p>
                                        <div className="toggle-display">
                                            <p className="toggle-input">{this.props.buyPrice} ETH</p>
                                            <div className="adjust-button">
                                                <p className="adjust-buy-button-text">ADJUST</p>
                                            </div>
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
                                                <p className="toggle-input">{this.props.sellPrice} ETH</p>
                                                <div className="adjust-button">
                                                    <p className="adjust-sell-button-text">ADJUST</p>
                                                </div>
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
                                            <p className="match-box-text"><b>Shares</b>: 4</p>
                                            <p className="match-box-text"><b>Price</b>: {this.props.sellPrice} ETH</p>
                                        </div>
                                        <p className="toggle-info">This will create an energy listing that buyers in your network can purchase.</p>
                                        <div className="adjust-button">
                                            <p className="adjust-sell-button-text">CREATE</p>
                                        </div>
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
                                            <p className="match-box-text"><b>Units</b>: {this.props.txEnergyAmount} kWh</p>
                                            <p className="match-box-text"><b>Price</b>: {this.props.txPPS} ETH</p>
                                        </div>
                                        <button className="accept-button" onClick={this.props.acceptTransaction(this.props.tx)}>
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