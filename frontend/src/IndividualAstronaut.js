import React from 'react';
import Header from './Header.js';

class IndividualAstronaut extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <p> astronaut individual page</p>
            </div>
        )
    }
    
}

export default IndividualAstronaut;