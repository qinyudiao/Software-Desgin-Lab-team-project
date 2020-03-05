import React from 'react';
import Header from './Header.js';

class Fail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Fail</h1> 
            </div>
        )
    }
}

export default Fail; 