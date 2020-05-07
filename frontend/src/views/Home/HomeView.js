import './Home.css';
import '../../assets/css/App.css';
import React from 'react';
import SidebarView from '../Sidebar/SidebarView.js';
import {List, ListItem} from "@material-ui/core";
import TransactionItem from "./TransactionItem.js";
import {data1, data2, data3, data4, SECONDARY_0, SECONDARY_1, PRIMARY_1} from "../../assets/constants.js";
import {
    XYPlot,
    LineSeries, 
    LineMarkSeries,
    VerticalGridLines, 
    HorizontalGridLines,
    XAxis,
    YAxis
} from 'react-vis';

const label = {
    fontFamily: "Apercu-Medium",
    fontSize: 8,
    color: "white",
    line: {stroke: "white", strokeWidth: 0.5},
    ticks: {stroke: "none", fill: "none"},
    text: {stroke: 'none', fill: "white"},
    marginTop: 0
}

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    shorten = (text) => {
        console.log("name",text);
        if (text != null) {
            if (text.length > 7) {
                return text.slice(0, 7) + "..."
            } else {
                return text
            }
        }
        else {
            return "N/A";
        }
    }

    render() {
        return (
            <div>
                <SidebarView 
                    username={this.props.username}
                    selected="home"
                    onLoggedOut={this.props.onLoggedOut}
                />
                <div className="wallet-container">
                    <div className="home-filler">
                    </div>
                    <div className="wallet">
                        <div className="outer-container">
                            <div className="page-header">
                                <p className="home-title">Hello, {this.props.username}</p>
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
                                <div className="transaction-col">
                                    <p className="home-subtitle">BOUGHT</p>
                                    <List className="test-list" disablePadding style={{
                                        maxHeight: "70vh", overflow: "auto", paddingLeft: 40, paddingRight: 40
                                    }}>
                                    {this.props.boughtTransactions.map((transaction) => (
                                        <TransactionItem 
                                            type="bought"
                                            color={SECONDARY_0}
                                            _id={transaction._id}
                                            pricePerShare={transaction.pricePerShare}
                                            energyAmount={transaction.energyAmount}
                                            totalPrice={transaction.totalPrice}
                                            seller={this.shorten(transaction.seller)}
                                            buyer={this.shorten(transaction.buyer)}
                                            data={data1}
                                            chartWidth={200}
                                            chartHeight={100}
                                        />
                                    ))}
                                    </List>
                                </div>
                                <div className="transaction-col">
                                    <p className="home-subtitle">SOLD</p>
                                    <List className="test-list" disablePadding style={{
                                        maxHeight: "70vh", overflow: "auto", paddingLeft: 40, paddingRight: 40
                                    }}>
                                    {this.props.soldTransactions.map((transaction) => (
                                        <TransactionItem 
                                            type="sold"
                                            color={PRIMARY_1}
                                            _id={transaction._id}
                                            pricePerShare={transaction.pricePerShare}
                                            energyAmount={transaction.energyAmount}
                                            totalPrice={transaction.totalPrice}
                                            seller={this.shorten(transaction.seller)}
                                            buyer={this.shorten(transaction.buyer)}
                                            data={data2}
                                            chartWidth={200}
                                            chartHeight={100}
                                        />
                                    ))}
                                    </List>
                                </div>
                                <div className="glance-col">
                                    <p className="home-subtitle">AT A GLANCE</p>

                                    <div className="glance-card">
                                        <div className="glance-card-container">
                                            <p className="glance-card-header" style={{marginTop: 12}}>Surplus you've held this <b>month</b>.</p>
                                            <XYPlot height={150} width={500}>
                                                <VerticalGridLines />
                                                <HorizontalGridLines />
                                                <XAxis 
                                                    position="middle" 
                                                    tickSizeInner={0}
                                                    style={label}
                                                />
                                                <YAxis 
                                                    position="middle" 
                                                    style={label}
                                                    tickSizeInner={500}
                                                />
                                                <LineSeries 
                                                    color="white"
                                                    data={data4} 
                                                    strokeWidth={1.5}
                                                    style={{fill: "none"}}
                                                />
                                            </XYPlot>
                                            <p className="glance-card-subtitle">Wow! That's enough to power a YMCA for two weeks!</p>
                                            <p className="glance-card-subtitle">Adjust your preferences to sell more.</p>
                                        </div>
                                    </div>

                                    <div className="glance-card">
                                        <div className="glance-card-container">
                                            <p className="glance-card-header" style={{marginTop: 12}}>Your electricity usage this <b>month</b>.</p>
                                            <XYPlot height={150} width={500}>
                                                <VerticalGridLines />
                                                <HorizontalGridLines />
                                                <XAxis 
                                                    position="middle" 
                                                    tickSizeInner={0}
                                                    style={label}
                                                />
                                                <YAxis 
                                                    position="middle" 
                                                    style={label}
                                                    tickSizeInner={500}
                                                />
                                                <LineSeries 
                                                    color="white"
                                                    data={data3} 
                                                    strokeWidth={1.5}
                                                    style={{fill: "none"}}
                                                />
                                            </XYPlot>
                                            <p className="glance-card-subtitle" style={{marginTop: 12}}>Surprised? Use less, sell more!</p>
                                        </div>
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