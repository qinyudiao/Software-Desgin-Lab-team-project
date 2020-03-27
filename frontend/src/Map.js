import React, { Component } from 'react';
import Header from './Header';
import { Layout } from "./components/Layout.js";
 
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
            <React.Fragment style={{ height: '100vh', width: '100%' }}>
              <Header></Header>
              <Layout>

              </Layout>

            </React.Fragment>
        )
    }
}

export default Map; 