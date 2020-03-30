import React, { Component } from 'react'
import './css/UpcomingLaunches.css';
import Header from './components/Header';
import moment from 'moment';
import 'moment-timezone';

// function getTimeCountDown(launches) {
//     let launchTime;
//     launches.forEach((launch) => {
//         launchTime = new Date(Number(launch.isonet.slice(0,4)), Number(launch.isonet.slice(4,6)), Number(launch.isonet.slice(6,8)),  Number(launch.isonet.slice(9,11)), Number(launch.isonet.slice(11,13)), Number(launch.isonet.slice(13,15)));
//         launchTimes = [...LaunchTimes, launchTime];
//     })
//     return launchTime;
// }

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
        //     let curTime = moment().utc().format('YYYYMMDDThhmmss');
        //     curTime = new Date(Number(curTime.slice(0,4)), Number(curTime.slice(4,6)), Number(curTime.slice(6,8)),  Number(curTime.slice(9,11)), Number(curTime.slice(11,13)), Number(curTime.slice(13,15)));
        //     console.log(curTime);
            

        //    // var diff = date2 - date1;
        //     // var diff = new moment.duration(diff);
        //     // console.log(diff.asDays());
        //     // console.log(diff.asHours());
        //     // console.log(diff.asMinutes());
        //     // console.log(diff.asSeconds());
        //     console.log(data.launches[0].isonet);
        //     console.log(curTime);
            this.setState({
                launches: data.launches,
                // countdowns: getTimeCountDown(data.launches),
            });
        });
    };

    componentDidUpdate(){

    }

    render() {
        const launches = this.state.launches.map((launch, index) => <div  key={index} className="upcoming-item">
            <h2>Launch {index+1}</h2>
            <div className="Launch-box">
                <span style={{width: "55%"}}>
                    <div className="rocket-image-container">
                        <img className="rocket-image" src={launch.rocket.imageURL} alt="Rocket"/>
                    </div>
                </span>
                <span className="info-box" style={{width: "45%"}}>
                    <h3 style={{marginBottom: "3.5%"}}>{launch.name}</h3>
                    <p style={{marginBottom: "1%"}}>{`Time till Launch: for phase3`}</p>
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
