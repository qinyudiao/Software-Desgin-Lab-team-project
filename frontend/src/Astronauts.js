import React from 'react';
import NavBar from './NavBar.js';

class Astronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>Astronauts</h1>
            </div>
        )
    }
}

export default Astronauts; 