import React from 'react';
import NavBar from './components/Navbar.js';

class IndividualLaunch extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <p>hi</p>
            </div>
        )
    }
}

export default IndividualLaunch;