import React, { Component } from 'react';
import './css/Map.css';
import moment from 'moment';
import 'moment-timezone';
import Header from './Header';
import MapContainer from './components/map_components/MapContainer';
import LaunchRank from './components/map_components/LaunchRank';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      launch_number: ""
    }
  }

  componentDidMount(){
    const date = moment().format("YYYY-MM-DD");
    const url = `https://launchlibrary.net/1.4/launch?startdate=1930-03-30&enddate=${date}`;
    console.log();
    fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        this.setState({launch_number: data.total})
    });
  }

  render(){
      return(
          <React.Fragment>
            <div style={ {height:"100vh"} }>
              <Header/>
              <div className="blackboard" style={ {height:"8vh"} }>
                <div id="headline-container">
                  <p id="headline">Every rocket launch since 1960 - Launches information provided by Launch Library at https://launchlibrary.net/ - updating</p>
                </div>
              </div>
              <div className="blackboard">
                <span id="left-column" className="column">
                  <div id="total-launches" className="column-item">
                    <p className="column-item-heading">Total Launches</p>
                    <p id="total-launches-number"> {this.state.launch_number}</p>
                  </div>
                  <div className="column-item" >
                    <LaunchRank />
                  </div>
                </span>
                <span id="middle-column" className="column">
                  <div id="map-container">
                    <MapContainer />
                  </div>
                </span>
                <span id="right-column" className="column">
                  <div id="launches-plot-year" className="column-item">
                    <p className="column-item-heading">Plot: Launches per year</p>
                  </div>
                </span>
              </div>
            </div>
          </React.Fragment>
      )
  }
}

export default Map; 