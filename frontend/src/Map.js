import React from 'react';
import Header from './Header';

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Map</h1>
            </div>
        )
    }
}

export default Map; 