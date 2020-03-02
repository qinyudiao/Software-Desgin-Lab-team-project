import React from 'react';
import NavBar from './NavBar.js';

class Launches extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>Launches</h1>
            </div>
        )
    }
}

export default Launches; 