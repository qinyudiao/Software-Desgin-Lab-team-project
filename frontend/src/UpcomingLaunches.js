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
        const url = `https://launchlibrary.net/1.4/launch/next/10`;
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
                <span style={{width: "55%"}}>
                    <div className="rocket-image-container">
                        <img className="rocket-image" src={launch.rocket.imageURL} alt="Rocket"/>
                    </div>
                </span>
                <span className="info-box" style={{width: "45%"}}>
                    <h3 style={{marginBottom: "3.5%"}}>{launch.name}</h3>
                    <p style={{marginBottom: "1%"}}>Time till Launch: for phase3</p>
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
        const a = <h1 className="upcoming-item">something</h1>;
        return (
            <React.Fragment>
                <div width="100vw">
                    <Header/>
                    <div className="flex-container">
                        <h1 id="upcoming-title">Upcoming launches</h1>
                        <div className="gallery-container">
                            {b}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
