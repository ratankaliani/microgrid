import React from 'react';
import DashboardView from './DashboardView';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            updates: [],
            users: {}
        };
    }

    componentDidMount() {
        let ws;

        if (window.WebSocket === undefined) {
            console.log("Failed to upload simulation...");
            ws = null;
        } else {
            ws = new WebSocket("ws://localhost:8080/ws");

            ws.onopen = () => {
                this.setState({connected: true});
            };
            ws.onmessage = (e) => {
                let data = JSON.parse(e.data);
                let users = this.state.users;
                for (let i = 0; i < data.length; i++) {
                    let element = data[i]
                    if (!(element.UserID in users)) {
                        users[element.UserID] = {
                            userID: element.UserID,
                            publicAddress: element.PublicAddress,
                            producer: element.Producer,
                            energyConsumed: [
                                {x: 0, y: 0},
                                {x: 1, y: element.EnergyConsumed}
                            ],
                            energyConsumedAgg: [
                                {x: 0, y: 0},
                                {x: 1, y: element.EnergyConsumed}
                            ],
                            energyProduced: [
                                {x: 0, y: 0},
                                {x: 1, y: element.EnergyProduced}
                            ],
                            energyProducedAgg: [
                                {x: 0, y: 0},
                                {x: 1, y: element.EnergyProduced}
                            ]    
                        }
                    } else {
                        users[element.UserID].producer = element.Producer;

                        let prevEnergyConsumed = users[element.UserID].energyConsumed[users[element.UserID].energyConsumed.length - 1];
                        let prevEnergyConsumedAgg = users[element.UserID].energyConsumedAgg[users[element.UserID].energyConsumedAgg.length - 1];
                        let prevEnergyProduced = users[element.UserID].energyProduced[users[element.UserID].energyProduced.length - 1];
                        let prevEnergyProducedAgg = users[element.UserID].energyProducedAgg[users[element.UserID].energyProducedAgg.length - 1];

                        users[element.UserID].energyConsumed = users[element.UserID].energyConsumed.concat(
                            [{x: prevEnergyConsumed.x + 1, y: element.EnergyConsumed}]
                        );
                        users[element.UserID].energyConsumedAgg = users[element.UserID].energyConsumedAgg.concat(
                            [{x: prevEnergyConsumedAgg.x + 1, y: prevEnergyConsumedAgg.y + element.EnergyConsumed}]
                        );
                        users[element.UserID].energyProduced = users[element.UserID].energyProduced.concat(
                            [{x: prevEnergyProduced.x + 1, y: element.EnergyProduced}]
                        );
                        users[element.UserID].energyProducedAgg = users[element.UserID].energyProducedAgg.concat(
                            [{x: prevEnergyProducedAgg.x + 1, y: prevEnergyProducedAgg.y + element.EnergyProduced}]
                        );
                    }
                }
                this.setState({users: users});
            }
            ws.onclose = () => {
                this.setState({connected: false});
            }

            console.log("We are living in a simulation...")
        }

    }

    render() {
        let consumerKeys = Object.keys(this.state.users)
        let producerKeys = []
        for (let consumerKey in consumerKeys) {
            console.log(consumerKeys[consumerKey], "KEY")
            if (this.state.users[consumerKeys[consumerKey]].producer) {
                producerKeys.push(consumerKeys[consumerKey])
            }
        }

        return (
            <DashboardView 
                consumerKeys={consumerKeys}
                producerKeys={producerKeys}
                users={this.state.users}
            />
        );
    }
}