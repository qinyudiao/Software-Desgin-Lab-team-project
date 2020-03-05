import React from 'react';
import Header from './Header.js';

class Launches extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Launches</h1>
            </div>
        )
    }
}

export default Launches; 