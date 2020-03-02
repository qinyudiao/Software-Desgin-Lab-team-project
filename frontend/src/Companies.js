import React from 'react';
import NavBar from './NavBar';

class Companies extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <NavBar />
                <h1>Companies</h1>
            </div>
        )
    }
}

export default Companies;