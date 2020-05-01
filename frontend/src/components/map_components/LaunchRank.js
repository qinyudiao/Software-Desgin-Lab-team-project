import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { byAlpha3 } from 'iso-country-codes';

export default class LaunchRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true
        }
    }

    componentDidMount() {
        if(this.props.launches.length > 0 && this.state.loading) {
            this.setState({ loading: false });
        }
    };

    componentDidUpdate() {
        if(this.props.launches.length > 0 && this.state.loading) {
            this.setState({loading: false});
        }
    }

    render() {
        switch (this.props.category) {
            case 'country':
                return <CountryRank loading={this.state.loading} launches={this.props.launches} />;
            case 'agency':
                return <AgencyRank loading={this.state.loading} launches={this.props.launches} />;
            default:
                return <React.Fragment></React.Fragment>;
        }
    }
}

const CountryRank = (props) => {
    let countryDict = {};
    const countryEntries = [];
    if(!props.loading) {
        props.launches.forEach(launch => {
            countryDict[launch.lsp.countryCode.slice(0, 3)] = (countryDict[launch.lsp.countryCode.slice(0, 3)] == null) ? 1 : countryDict[launch.lsp.countryCode.slice(0, 3)] + 1;
        });
        for(let [key,value] of Object.entries(countryDict)){
            if(value > 0 && key !== undefined)
                countryEntries.push({name: byAlpha3[key].name, number: value});
        }
        countryEntries.sort((a, b) => (a.number > b.number) ? -1 : 1);
    }

    return (
        <React.Fragment>
            <p id="launch-rank-title">Launches by Country</p>     
            <ListGroup variant="flush" style={{
                    color: "white",
                    width: "100%",
                    fontSize: "1.5vh",
                    padding: "1rem"
                }} id="launch-rank-list">
                { props.loading ? <div className="column-item" style={{color:'red', borderWidth:0}}>Loading...</div> :
                    countryEntries.map((entry, index) => {
                        return <ListGroup.Item key={index} style={{ backgroundColor: "transparent", padding: "1.2rem" }}>
                            <span style={{color: 'red'}}>{`${entry.number} `}</span>
                            <span>{`${entry.name}`}</span>
                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </React.Fragment>
    )
}

const AgencyRank = (props) => {
    let agencyDict = {};
    const agencyEntries = [];
    if(!props.loading) {
        props.launches.forEach(launch => {
            agencyDict[launch.lsp.name] = (agencyDict[launch.lsp.name] == null) ? 1 : agencyDict[launch.lsp.name] + 1;
        });
        for(let [key,value] of Object.entries(agencyDict)) {
            if(value > 0 && key !== undefined)
                agencyEntries.push({name: key, number: value});
        }
        agencyEntries.sort((a, b) => (a.number > b.number) ? -1 : 1);
    }
    return (
        <React.Fragment>
            <p id="launch-rank-title">Launches by Country</p>     
            <ListGroup variant="flush" style={{
                    color: "white",
                    width: "100%",
                    fontSize: "1.5vh",
                    padding: "1rem"
                }} id="launch-rank-list">
                { props.loading ? <div className="column-item" style={{color:'red', borderWidth:0}}>Loading...</div> :
                    agencyEntries.map((entry, index) => {
                        return <ListGroup.Item key={index} style={{ backgroundColor: "transparent", padding: "1.2rem" }}>
                            <span style={{color: 'red'}}>{`${entry.number} `}</span>
                            <span>{`${entry.name}`}</span>
                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </React.Fragment>
    )
}
