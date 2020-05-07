import './Home.css';
import React from 'react';
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

export default class TransactionItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="transaction-card" style={{alignSelf: "center", backgroundColor: this.props.color}}>
                <div className="transaction-header-grid">
                    <div className="transaction-header-grid-row">
                        <p className="transaction-header-grid-elem">{this.props.type == "bought" ? "Vendor:" : "Buyer:"} {this.props.seller}</p>
                        <p className="transaction-header-grid-elem">Shares bought: {this.props.energyAmount}</p>
                    </div>
                    <div className="transaction-header-grid-row">
                        <p className="transaction-header-grid-elem">Buy price: {this.props.pricePerShare}</p>
                        <p className="transaction-header-grid-elem">Total spend: {this.props.totalPrice}</p>
                    </div>
                </div>
                <p className="transaction-header-grid-elem" style={{marginTop: 12}}>Share valuation vs. time</p>
                <XYPlot height={this.props.chartHeight} width={this.props.chartWidth} style={{marginTop: 12}}>
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
                        tickSizeInner={0}
                    />
                    <LineSeries 
                        color="white"
                        data={this.props.data} 
                        strokeWidth={1.5}
                        style={{fill: "none"}}
                    />
                </XYPlot>
                <p className="transaction-header-grid-elem" style={{marginTop: 12}}>ID: {this.props._id}</p>
            </div>
        );
      }
}