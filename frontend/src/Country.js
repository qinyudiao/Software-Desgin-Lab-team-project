import React from 'react';
import Header from './Header.js';

class Country extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Country</h1>
            </div>
        )
    }
}

export default Country;