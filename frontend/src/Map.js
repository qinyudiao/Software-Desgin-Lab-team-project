import React, { Component } from 'react';
import './css/Map.css';
import moment from 'moment';
import 'moment-timezone';
import Header from './components/Header';
import MapContainer from './components/map_components/MapContainer';
import LaunchRank from './components/map_components/LaunchRank';
import LastUpdateTime from './components/map_components/LastUpdateTime';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      launch_number: ""
    }
  }

  componentDidMount(){
    const date = moment().format("YYYY-MM-DD");
    const url = `https://launchlibrary.net/1.4/launch/?enddate=${date}`;
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
              <div>
                <div className="blackboard" style={ {height:"8vh"} }>
                <div id="headline-container">
                  <p id="headline">
                    Every rocket launch since 1960 - Launches data source from Launch Library at <a href="https://launchlibrary.net/" style={{color: "#99c"}}>
                      https://launchlibrary.net/
                      </a> - updating
                  </p>
                </div>
              </div>

              <div className="blackboard">
                <span id="left-column" className="column">
                  <div id="total-launches" className="column-item">
                    <p className="column-item-heading">Total Launches</p>
                    <p id="total-launches-number"> {this.state.launch_number}</p>
                  </div>
                  <div className="column-item" style={{height: "59.5vh"}}>
                    <LaunchRank />
                  </div>
                  <div className="column-item" style={{height: "7vh", display: "absolute"}}>
                    <LastUpdateTime />
                  </div>
                </span>

                <span id="middle-column" className="column">
                  <div id="map-container">
                    <MapContainer />
                  </div>
                  <div className="column-item" style={{height: "21.1vh", marginTop: "0.8vh", display: "absolute"}}>
                    <p style={{color: "#aaa", fontSize: "85%", marginBottom: "0"}}>
                        Note:<br/>
                        - The first launch recorded in this database is a Atlas LV-3A rocket carried a Samos 2 launched by United States Air Force launched and launched at January 31, 1961 20:21:19 UTC.<br/>
                        - The total launches number is based on all the recorded launches, there are some rocket launches that are not recorded.<br/> 
                        - The launches by country rank is based on all the recorded launches which has a recorded location, there are some rocket launches that are recorded but do not with a location.<br/>
                        - Each launch's country affiliation is based on the launch pad location in current ISO countries.<br/>
                        - Each marker in the map represents a launch pad which has a recorded launch.
                    </p>
                  </div>
                </span>

                <span id="right-column" className="column">
                  <div id="launches-plot-month" className="column-item" style={{height: "27.5vh"}}>
                    <p className="column-item-heading">Plot: Launches by month in last 5 year</p>
                    <p>Coming soon in phase 3</p>
                  </div>
                  <div id="launches-plot-year" className="column-item" style={{height: "27.5vh"}}>
                    <p className="column-item-heading">Plot: Launches by year</p>
                    <p>Coming soon in phase 3</p>
                  </div>
                  <div id="launches-plot-year" className="column-item" style={{height: "27.6vh"}}>
                    <p className="column-item-heading">Plot: Total launches over years</p>
                    <p>Coming soon in phase 3</p>
                  </div>
                </span>
              </div>
                
              </div>
            </div>
          </React.Fragment>
      )
  }
}

export default Map;
