import React from 'react';
import NavBar from './NavBar.js';

class Country extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>Country</h1>
            </div>
        )
    }
}

export default Country;