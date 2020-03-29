import React, { Component } from 'react';
import './css/Map.css';
import moment from 'moment';
import 'moment-timezone';
import Header from './Header';
import MapContainer from './components/MapContainer.js';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
// const handleApiLoaded = (map, maps) => {
//   // use map and maps objects
// };


class Map extends Component {
  static defaultProps = {
    center: {
      lat: 25.997402,
      lng: -97.157329
    },
    zoom: 15
  };

  constructor(props){
    super(props);
    this.state = {
      launch_number: ""
    }
  }

  componentDidMount(){
    const date = moment().format("YYYY-MM-DD");
    //console.log(date);
    const url = `https://launchlibrary.net/1.4/launch?limit=5000?startdate=1960-08-20&enddate=${date}`;
    console.log();
    fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        this.setState({launch_number: data.total})
        //console.log(data.count);
    });
  }

  render(){
      return(
          <React.Fragment>
            <Header></Header>
            <div className="black-board">
              <span id="left-column" className="column">
                <div id="total-launches" className="column-item">
                  <h6>Total Launches</h6>
                  <p id="total-launches-number"> {this.state.launch_number}</p>
                </div>
                <div id="launches-by-region" className="column-item">
                  <h3>Launches by Region</h3>
                </div>
              </span>
              <span id="middle-column" className="column">
                <div id="map-container">
                  <MapContainer />
                </div>
              </span>
              <span id="right-column" className="column">
                <div id="launches-plot-year" className="column-item">
                  <p>Plot: Launches per year</p>
                </div>
              </span>
            </div>
          </React.Fragment>
      )
  }
}

export default Map; 