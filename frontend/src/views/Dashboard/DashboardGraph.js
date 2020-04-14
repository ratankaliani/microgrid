import './Dashboard.css';
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
    fontSize: 14,
    color: "white",
    line: {stroke: "white", strokeWidth: 0.5},
    ticks: {stroke: "none", fill: "none"},
    text: {stroke: 'none', fill: "white"},
    marginTop: 0
}

export default class DashboardView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
                <div className="dashboard-graph" style={{backgroundColor: this.props.backgroundColor}}>
                    <p style={{...label, alignSelf: "flex-start"}}>{this.props.yTitle}</p>
                    <XYPlot height={this.props.height} width={this.props.width}>
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
                            tickSizeInner={this.props.width}
                        />
                        <LineSeries 
                            color="white"
                            data={this.props.data} 
                            strokeWidth={1.5}
                            style={{fill: "none"}}
                        />
                    </XYPlot>
                    <p style={{...label}}>{this.props.xTitle}</p>
                </div>
        );
      }
}