import React from 'react';
import NavBar from './NavBar.js';

class Education extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>Education</h1>
            </div>
        )
    }
}

export default Education;