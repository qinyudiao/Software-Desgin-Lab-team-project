import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { codes, byAlpha3 } from 'iso-country-codes';
import moment from 'moment';
import 'moment-timezone';
import ec2url from '../../EC2Link';

export default class LaunchRank extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          entries: [],
          agencyEntries: []
        }
    }

    componentDidMount(){
        let dict = {};
        let agencyDict = {};
        fetchLaunches()
        .then((launches) => {
            // get date
        // const date = moment().format("YYYY-MM-DD");
            console.log(dict['sd']);
            launches.forEach(launch => {
                if(dict[launch.lsp.countryCode.slice(0, 3)] == null)
                    dict[launch.lsp.countryCode.slice(0, 3)] = 1;
                else
                    dict[launch.lsp.countryCode.slice(0, 3)] += 1;

                if(agencyDict[launch.lsp.name] == null)
                    agencyDict[launch.lsp.name] = 1;
                else
                    agencyDict[launch.lsp.name] += 1;
            });
            const entries= [];
            for(let [key,value] of Object.entries(dict)){
                if(value>0 && key!==undefined){
                    // console.log(key);
                    entries.push({name: byAlpha3[key].name, number: value});
                }
            }
            entries.sort((a, b) => (a.number > b.number ? -1 : 1 ) );
            this.setState({entries: entries, loading: false});

            const agencyEntries= [];
            for(let [key,value] of Object.entries(agencyDict)){
                if(value>0 && key!==undefined){
                    // console.log(key);
                    agencyEntries.push({name: key, number: value});
                }
            }
            agencyEntries.sort((a, b) => (a.number > b.number ? -1 : 1 ) );
            this.setState({agencyEntries: agencyEntries, loading: false});
        });

    };

    render() {

        return (
            (this.props.category === 'country') ?
            <React.Fragment>
                <p id="launch-rank-title">Launches by Country</p>     
                <ListGroup variant="flush" style={{
                        color: "white",
                        width: "100%",
                        fontSize: "1.5vh",
                        padding: "1rem"
                    }} id="launch-rank-list">
                    { this.state.loading ? <div className="column-item" style={{color:'red', borderWidth:0}}>Loading...</div> :
                        this.state.entries.map((entry, index) => {
                            return <ListGroup.Item key={index} style={{ backgroundColor: "transparent", padding: "1.2rem" }}>
                                <span style={{color: 'red'}}>{`${entry.number} `}</span>
                                <span>{`${entry.name}`}</span>
                            </ListGroup.Item>
                        })
                    }
                </ListGroup>
            </React.Fragment>
            :
            <React.Fragment>
            <p id="launch-rank-title">Launches by Agency</p>     
            <ListGroup variant="flush" style={{
                    color: "white",
                    width: "100%",
                    fontSize: "1.5vh",
                    padding: "1rem"
                }} id="launch-rank-list">
                { this.state.loading ? <div className="column-item" style={{color:'red', borderWidth:0}}>Loading...</div> :
                    this.state.agencyEntries.map((entry, index) => {
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
    
}

const fetchLaunches = async () => {
    let url = '';
    if(process.env.NODE_ENV === 'production'){
      url = ec2url + '/launch';
    }
    else{
      url = '/launch';
    }
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}
