import React, { Component } from 'react'
import moment from 'moment';
import 'moment-timezone';

export default class LastUpdateTime extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: ""
        }
    }


    componentDidMount(){
        // get time
        const time = moment().format("MM/DD/YYYY, hh:mm:ss A");
        this.setState({time: time});
    };

    render() {
        return (
            <React.Fragment>
                <p style={{
                    fontSize: "0.8vw",
                    marginBottom: 0,
                }}>Last updated at</p>
                <p style={{
                    fontSize: "1.2vw",
                    color: "#c5c5c5",
                    marginBottom: 0,
                }}>{`${this.state.time}`}</p>
            </React.Fragment>
        )
    }
}
