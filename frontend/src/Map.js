import React from 'react';
import NavBar from './NavBar';

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
                <h1>Map</h1>
            </div>
        )
    }
}

export default Map; 