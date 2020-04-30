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
import DashboardGraph from "./DashboardGraph.js"
import {testUsers, PRIMARY_1, SECONDARY_0, SECONDARY_1} from "../../assets/constants.js";

const label = {
    color: "white",
    fontFamily: "Apercu-Medium",
    fontSize: 18,
    textColor: "white",
    line: {stroke: "white"},
    ticks: {stroke: "white"},
    text: {stroke: 'none', fill: "white"}
}

export default class DashboardView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-container">
                    <h1 className="dashboard-title">MicroGrid Dashboard</h1>

                    <h2 className="dashboard-subtitle">Consumption</h2>
                    {
                        this.props.consumerKeys.length == 0 ?
                        <p className="dashboard-null">No consumers to track</p> :
                        this.props.consumerKeys.map(userID => 
                            <div className="dashboard-graph-container">
                                <h3 className="chart-title">{"Public Address: " + this.props.users[userID].publicAddress}</h3>
                                <div className="dashboard-graph-row">
                                    <DashboardGraph
                                        backgroundColor={PRIMARY_1} 
                                        data={this.props.users[userID].energyConsumed}
                                        xTitle="Timestep"
                                        yTitle="Energy Consumed (kWh/Timestep)"
                                        height={200}
                                        width={500}
                                    />
                                    <div style={{width: 48}}></div>
                                    <DashboardGraph 
                                        backgroundColor={SECONDARY_1}
                                        data={this.props.users[userID].energyConsumedAgg}
                                        xTitle="Timestep"
                                        yTitle="Total Energy Consumed (kWh)"
                                        height={200}
                                        width={500}
                                    />
                                </div>
                            </div>
                        )
                    }

                    <h2 className="dashboard-subtitle">Production</h2>
                    {
                        this.props.producerKeys.length == 0 ?
                        <p className="dashboard-null">No producers to track</p> :
                        this.props.producerKeys.map(userID => 
                            <div className="dashboard-graph-container">
                                <h3 className="chart-title">{"Public Address: " + this.props.users[userID].publicAddress}</h3>
                                <div className="dashboard-graph-row">
                                    <DashboardGraph
                                        backgroundColor={SECONDARY_0} 
                                        data={this.props.users[userID].energyProduced}
                                        xTitle="Timestep"
                                        yTitle="Energy Produced (kWh/Timestep)"
                                        height={200}
                                        width={500}
                                    />
                                    <div style={{width: 48}}></div>
                                    <DashboardGraph 
                                        backgroundColor={SECONDARY_1}
                                        data={this.props.users[userID].energyProducedAgg}
                                        xTitle="Timestep"
                                        yTitle="Total Energy Produced (kWh)"
                                        height={200}
                                        width={500}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
      }
}