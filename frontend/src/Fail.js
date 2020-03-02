import React from 'react';
import NavBar from './NavBar.js';

class Fail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>Fail</h1> 
            </div>
        )
    }
}

export default Fail; 