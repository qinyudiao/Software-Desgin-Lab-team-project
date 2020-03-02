import React from 'react';
import './About.css';
import NavBar from './NavBar';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>About</h1>
            </div>
        )
    }
}

export default About;