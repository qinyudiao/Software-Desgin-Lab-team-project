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
          entries: []
        }
    }

    componentDidMount(){
        let dict = {};
        codes.forEach(country => {
            dict[country.alpha3] = 0;
        });
        fetchLaunches()
        .then((launches) => {
            // get date
        // const date = moment().format("YYYY-MM-DD");
            launches.forEach(launch => {
                dict[launch.locationData.countrycode] += 1;
            });
            const entries= [];
            for(let [key,value] of Object.entries(dict)){
                if(value>0 && key!==undefined){
                    entries.push({name: byAlpha3[key].name, number: value});
                }
            }
            entries.sort((a, b) => (a.number > b.number ? -1 : 1 ) );
            this.setState({entries: entries, loading: false});
        });

    };

    render() {
        return (
            <React.Fragment>
                <p id="launch-rank-title">Launches by Country</p>     
                <ListGroup variant="flush" style={{
                        color: "white",
                        width: "100%",
                    }} id="launch-rank-list">
                    { this.state.loading ? <div className="column-item" style={{color:'red', borderWidth:0}}>Loading...</div> :
                        this.state.entries.map((entry, index) => {
                            return <ListGroup.Item key={index} style={{ backgroundColor: "transparent"}}>
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
    // console.log(data);
    return data;
}
