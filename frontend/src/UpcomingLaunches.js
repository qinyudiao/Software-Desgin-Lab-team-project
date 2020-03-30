import React, { Component } from 'react'
import './css/UpcomingLaunches.css';
import Header from './components/Header';

export default class UpcomingLaunches extends Component {
    constructor(props){
        super(props);
        this.state = {
            launches: []
        }
    }

    componentDidMount(){
        const url = `https://launchlibrary.net/1.4/launch/next/5`;
        console.log(url);
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                launches: data.launches,
            });
        });
    };

    render() {
        const b = this.state.launches.map((launch, index) => <div  key={index} className="upcoming-item">
            <h2>Launch {index+1}</h2>
            <div className="Launch-box">
                <span><img className="rocket-image" src={launch.rocket.imageURL} alt="Rocket" width="500px"/></span>
                <span className="info-box">
                    <h3 style={{marginBottom: "3vh"}}>{launch.name}</h3>
                    <p style={{marginBottom: "1vh"}}>Time till Launch: for phase3</p>
                    <p style={{marginBottom: "1vh"}}>Agency: {launch.lsp.name}</p>
                    <p style={{marginBottom: "1vh"}}>Time: {launch.net}</p>
                    <p style={{marginBottom: "1vh"}}>Location: {launch.location.name}</p>
                    <p style={{marginBottom: "1vh"}}>Pad: {launch.location.pads[0].name}</p>
                    <a style={{marginBottom: "1vh"}} href={launch.location.pads[0].mapURL}>{launch.location.pads[0].mapURL}</a>
                </span>
            </div>
        </div>)
        const a = <h1 className="upcoming-item">something</h1>;
        return (
            <React.Fragment>
                <Header/>
                <div className="flex-container">
                    <h1 className="upcoming-item">Upcoming launches</h1>
                    {b}
                </div>
            </React.Fragment>
        )
    }
}
