import React, { Component } from 'react'
import './css/UpcomingLaunches.css';
import Header from './components/Header';
import moment from 'moment';
import 'moment-timezone';

function getTimeCountDown(launches, curTime) {
    let countdowns = [];
    launches.forEach((launch) => {
        const launchTime = new Date(Number(launch.isonet.slice(0,4)), Number(launch.isonet.slice(4,6)), Number(launch.isonet.slice(6,8)),  Number(launch.isonet.slice(9,11)), Number(launch.isonet.slice(11,13)), Number(launch.isonet.slice(13,15)));
        const diff = new moment.duration(launchTime - curTime);
        const countdown = `${parseInt(diff.asDays())%365} days ${parseInt(diff.asHours())%24} hours ${parseInt(diff.asMinutes())%60} minutes ${parseInt(diff.asSeconds())%60} seconds`;
        countdowns.push(countdown);
    })
    return countdowns;
}

export default class UpcomingLaunches extends Component {
    constructor(props){
        super(props);
        this.state = {
            launches: [],
            countdowns: []
        }
    }

    componentDidMount(){
        const url = `https://launchlibrary.net/1.4/launch/next/10`;
        console.log(url);
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const curTime = moment().utc().format('YYYYMMDDThhmmss');
            const countdowns = getTimeCountDown(data.launches, new Date(Number(curTime.slice(0,4)), Number(curTime.slice(4,6)), Number(curTime.slice(6,8)),  Number(curTime.slice(9,11)), Number(curTime.slice(11,13)), Number(curTime.slice(13,15))));
            setTimeout(() => {
                this.setState({
                    launches: data.launches,
                    countdowns: countdowns,
                });
            }, 1000)
        });
    };

    componentDidUpdate(){
        const curTime = moment().utc().format('YYYYMMDDThhmmss');
        const countdowns = getTimeCountDown(this.state.launches, new Date(Number(curTime.slice(0,4)), Number(curTime.slice(4,6)), Number(curTime.slice(6,8)),  Number(curTime.slice(9,11)), Number(curTime.slice(11,13)), Number(curTime.slice(13,15))));
        setTimeout(() => {
            this.setState({countdowns: countdowns})
        }, 1000)
    }
    
    render() {
        const launches = this.state.launches.map((launch, index) => <div  key={index} className="upcoming-item">
            <br/>
            <h2>Launch {index+1}</h2>
            <div className="Launch-box">
                <span style={{width: "55%"}}>
                    <div className="rocket-image-container">
                        <img className="rocket-image" src={launch.rocket.imageURL} alt="Rocket"/>
                    </div>
                </span>
                <span className="info-box" style={{width: "45%"}}>
                    <h3 style={{marginBottom: "3.5%"}}>{launch.name}</h3>
                    <p style={{marginBottom: "1%"}}>{`Countdown: \n${this.state.countdowns[index]}`}</p>
                    <p style={{marginBottom: "1%"}}>Agency: {launch.lsp.name}</p>
                    <p style={{marginBottom: "1%"}}>Time: {launch.net}</p>
                    <p style={{marginBottom: "1%"}}>Location: {launch.location.name}</p>
                    <p style={{marginBottom: "1%"}}>Pad: {launch.location.pads[0].name}</p>
                    <p style={{marginBottom: "1%"}}>
                        <a href={launch.location.pads[0].mapURL}>Find it on Google Maps!</a>
                    </p>
                </span>
            </div>
        </div>)

        return (
            <React.Fragment>
                <div width="100vw">
                    <Header/>
                    <div className="flex-container">
                        <h1 id="upcoming-title">Upcoming launches</h1>
                        <div className="gallery-container">
                            {launches}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
