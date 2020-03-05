import React from 'react';
import Header from './Header';

class Astronauts extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Astronauts</h1>
            </div>
        )
    }
}

export default Astronauts; 