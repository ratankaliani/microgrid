import './Preferences.css';
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

export default class PreferencesView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="preferences">
                 
            </div>
        );
      }
}