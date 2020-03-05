import React from 'react';
import './About.css';
import Header from './Header';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>About</h1>
            </div>
        )
    }
}

export default About;