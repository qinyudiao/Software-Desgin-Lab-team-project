import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { codes, byAlpha3 } from 'iso-country-codes';
import moment from 'moment';
import 'moment-timezone';

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
        // get date
        const date = moment().format("YYYY-MM-DD");
        const url = `https://launchlibrary.net/1.4/launch/?limit=5000&fields=location&enddate=${date}`;
        console.log(url);
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            data.launches.forEach(launch => {
                dict[launch.location.countryCode] += 1;
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
                                    {`${entry.number} ${entry.name}`}
                                </ListGroup.Item>
                            })
                        }
                    </ListGroup>
            </React.Fragment>
        )
    }
}
