import React from 'react';
import NavBar from './NavBar';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const geoUrl = "frontend/src/assets/ne_50m_admin_0_countries.json";

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
            </div>
        )
    }
}

export default Map; 