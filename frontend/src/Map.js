import React, { Component } from 'react';
import Header from './Header';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 25.997402,
      lng: -97.157329
    },
    zoom: 15
  };
 

    render(){
        return(
            <div style={{ height: '100vh', width: '100%' }}>
                <Header />
                <GoogleMapReact
                    bootstrapURLKeys={"AIzaSyD4MYem9eEY7_iLZSCyOdy-40GBCq4x2vY"}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >

                </GoogleMapReact>
            </div>
        )
    }
}

export default Map; 